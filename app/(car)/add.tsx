import {useEffect, useMemo, useState} from 'react'
import {
    View,
    TextInput,
    Pressable,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Image,
    StyleSheet
} from 'react-native'
import {
    Select,
    Adapt,
    Sheet,
    YStack,
    XStack,
    Text,
} from 'tamagui'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'
import {CAR_BRANDS, DEFAULT_CAR_IMAGES, COLORS, BODY_TYPES, FUEL_TYPES} from "@/components/garage/cars";

import axios from 'axios'
import { useAuthStore } from '@/store/useAuthStore'
import { useAddCar } from '@/hooks/useAddCar'
import * as ImagePicker from 'expo-image-picker'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { uploadToImgbb } from '@/utils/uploadToImgbb'
import {logScreen, logEvent} from "@/lib/analytics";
/* ================= DATA (ИЗ AddCar.jsx) ================= */



const FALLBACK_CAR_IMAGE =
    "https://i.3dmodels.org/uploads/Lexus/141_Lexus_RX_hybrid_F_Sport_2022/Lexus_RX_hybrid_F_Sport_2022_1000_0005.jpg";

// === helpers ===
function normalizeModelForImage(model = "") {
    return model.trim().replace(/\s+/g, "_")
}

function getDefaultCarImage(brand?: string | null, model?: string | null) {
    if (!brand || !model) return FALLBACK_CAR_IMAGE
    const key = normalizeModelForImage(model)
    return DEFAULT_CAR_IMAGES?.[brand]?.[key] || FALLBACK_CAR_IMAGE
}

const DEFAULT_IMAGE =
    'https://i.3dmodels.org/uploads/Lexus/141_Lexus_RX_hybrid_F_Sport_2022/Lexus_RX_hybrid_F_Sport_2022_1000_0005.jpg'

/* ================= HELPERS ================= */

function formatPlate(value = '') {
    let v = value.toUpperCase().replace(/[^A-Z0-9]/g, '')
    if (v.length <= 2) return v
    if (/^\d{2}[A-Z]/.test(v)) {
        if (v.length <= 3) return `${v.slice(0,2)} ${v.slice(2)}`
        if (v.length <= 6) return `${v.slice(0,2)} ${v.slice(2,3)} ${v.slice(3)}`
        return `${v.slice(0,2)} ${v.slice(2,3)} ${v.slice(3,6)} ${v.slice(6,8)}`
    }
    if (/^\d{2}\d/.test(v)) {
        if (v.length <= 5) return `${v.slice(0,2)} ${v.slice(2)}`
        return `${v.slice(0,2)} ${v.slice(2,5)} ${v.slice(5,8)}`
    }
    return v
}

/* ================= REUSABLE SELECT ================= */

function AppSelect({
                       value,
                       id,
                       placeholder,
                       items,
                       onChange,
                       disabled,
                   }: {
    value: string | null
    id: string | null
    placeholder: string
    items: string[]
    onChange: (v: string) => void
    disabled?: boolean
}) {
    const textOnSelect = () => {
        switch (id){
            case "marka":
                return i18n.t('garage.selectBrand')
            case "model":
                return i18n.t('garage.selectModel')
            case "kuzov":
                return i18n.t('garage.selectBodyType')
            case "fuel":
                return i18n.t('garage.selectFuelType')
            case "color":
                return i18n.t('garage.selectColor')
        }
    }
    return (
        <Select
            native
            value={value ?? ''}
            onValueChange={onChange}
            disablePreventBodyScroll
        >
            <Select.Trigger
                disabled={disabled}
                height={54}
                borderRadius={18}
                backgroundColor="#FFF"
                borderWidth={"$0"}
                paddingHorizontal="$4"
                pressStyle={{backgroundColor: "$white5"}}
                opacity={disabled ? 0.4 : 1}
            >
                <Select.Value placeholder={placeholder} color={value === null ? "$gray11" : "#000"} fontFamily={"$heading"} fontWeight={value === null ? 400 : 600}/>

            </Select.Trigger>

            <Adapt when="sm" platform="touch">
                <Sheet modal snapPoints={[80]} dismissOnSnapToBottom >
                    <Sheet.Frame padding={"$4"} paddingVertical={"$6"}  backgroundColor={"#FFF"} borderRadius={"$10"}>
                        <Sheet.Handle backgroundColor="$white5" height={"$0.5"} width={"$2"} alignSelf={"center"} bottom={"$3"} />
                        <Text color={"#000"} left={"$2"} bottom={"$3"} fontWeight={700} fontSize={"$6"}>{textOnSelect()}</Text>
                        <Sheet.ScrollView showsVerticalScrollIndicator={false} >
                            <Adapt.Contents />
                        </Sheet.ScrollView>
                    </Sheet.Frame>
                    <Sheet.Overlay />
                </Sheet>
            </Adapt>

            <Select.Content >
                <Select.ScrollUpButton />

                <Select.Viewport >
                    {items.map((item, i) => (
                        <Select.Item index={i} key={item} value={item} backgroundColor={"#FFF"} pressStyle={{backgroundColor: "$white5"}}>
                            <Select.ItemText color={"#000"} fontSize={"$2"}>{item.trim().replace("_", " ")}</Select.ItemText>
                            <Select.ItemIndicator marginLeft="auto">
                            </Select.ItemIndicator>
                        </Select.Item>
                    ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
            </Select.Content>
        </Select>
    )
}

/* ================= SCREEN ================= */

export default function AddCarPage() {
    const [form, setForm] = useState({
        plateNumber: '',
        brand: null as string | null,
        model: null as string | null,
        year: '',
        color: null as string | null,
        bodyType: null as string | null,
        fuelType: null as string | null,
    })
    const [customImage, setCustomImage] = useState<string | null>(null)
    const [uploadingImage, setUploadingImage] = useState(false)
    const {t} = useTranslation();

    const models = useMemo(
        () => (form.brand ? CAR_BRANDS[form.brand] : []),
        [form.brand]
    )
    const user = useAuthStore((s) => s.user)
    const canSave =
        form.plateNumber.length >= 6 &&
        !!form.brand &&
        !!form.model

    const pickImage = async () => {
        const permission =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (!permission.granted) {
            alert('Разрешите доступ к галерее')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.8,
        })

        if (!result.canceled) {
            setCustomImage(result.assets[0].uri)
        }
    }

    const { mutate, isPending } = useAddCar(() => {
        router.back()
    })

    useEffect(() => {
        logScreen('Add Car Screen');
    }, []);


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <YStack gap="$4" top={"$7"}>
                    <Text fontSize={22} fontWeight="900" color={"#000"}>
                        {t('garage.add')}
                    </Text>
                    <Pressable onPress={pickImage}>
                        <Image
                            source={{
                                uri:
                                    customImage ||
                                    getDefaultCarImage(form.brand, form.model),
                            }}
                            style={{ height: 180, borderRadius: 18 }}
                        />
                    </Pressable>

                    <Text color="$gray10" fontSize={13}>
                        {t('garage.clickToUploadImg')}
                    </Text>

                    <TextInput
                        placeholder="01 A 777 AA"
                        value={form.plateNumber}
                        onChangeText={(v) =>
                            setForm({ ...form, plateNumber: formatPlate(v) })
                        }
                        style={styles.inputStyle}
                    />

                    <AppSelect
                        placeholder={t('garage.brand')}
                        id={"marka"}
                        value={form.brand}
                        items={Object.keys(CAR_BRANDS)}
                        onChange={(brand) =>
                            setForm({ ...form, brand, model: null })
                        }
                    />

                    <AppSelect
                        placeholder={t('garage.model')}
                        id={"model"}
                        value={form.model}
                        items={models}
                        disabled={!form.brand}
                        onChange={(model) =>
                            setForm({ ...form, model })
                        }
                    />

                    <AppSelect
                        placeholder={t('garage.color')}
                        id={"color"}
                        value={form.color}
                        items={COLORS}
                        onChange={(color) =>
                            setForm({ ...form, color })
                        }
                    />

                    <AppSelect
                        placeholder={t('garage.bodyType')}
                        id={"kuzov"}
                        value={form.bodyType}
                        items={BODY_TYPES}
                        onChange={(bodyType) =>
                            setForm({ ...form, bodyType })
                        }
                    />

                    <AppSelect
                        placeholder={t('garage.fuelType')}
                        id={"fuel"}
                        value={form.fuelType}
                        items={FUEL_TYPES}
                        onChange={(fuelType) =>
                            setForm({ ...form, fuelType })
                        }
                    />
                </YStack>
            </ScrollView>

            <View style={styles.bottomBar}>
                <Pressable
                    disabled={isPending || !canSave}
                    onPress={() => {
                        mutate({
                            brand: String(form.brand),
                            model: String(form.model),
                            year: form.year,
                            color: String(form.color),
                            plateNumber: form.plateNumber,
                            bodyType: String(form.bodyType),
                            fuelType: String(form.fuelType),
                            image: getDefaultCarImage(form.brand, form.model),
                            isPrimary: true,
                        })
                    }}
                    style={[
                        styles.saveBtn,
                        isPending && { opacity: 0.6 },
                    ]}
                >
                    <Text color={"white"} fontWeight={700}>
                        {isPending ? t('garage.saving') : t('garage.add')}
                    </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
    inputStyle: {
        height: 54,
        borderRadius: 18,
        backgroundColor: '#FFF',
        paddingHorizontal: 16,
        fontSize: 16,
    },
    bottomBar: {
        position: 'absolute' as const,
        left: 0,
        right: 0,
        bottom: Platform.OS === 'ios' ? 15 : 15,
        padding: 16,
    },
    saveBtn: {
        height: 56,
        borderRadius: 18,
        backgroundColor: '#006cff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
