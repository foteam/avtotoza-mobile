import { useMemo, useState } from 'react'
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

/* ================= DATA (ИЗ AddCar.jsx) ================= */

const CAR_BRANDS: Record<string, string[]> = {
    Chevrolet: ['Cobalt','Gentra','Nexia','Nexia 2','Nexia 3','Malibu','Malibu 2','Tahoe','Tracker','Onix','Spark','Lacetti','Damas','Equinox','Monza','Matiz'],
    Kia: ['K5','K7','K8','K9','Sportage','Sorento','Seltos','Rio','Sonet'],
    Hyundai: ['Elantra','Sonata','Tucson','Santa Fe','Accent'],
    Toyota: ['Camry','Land Cruiser 200','Land Cruiser 300'],
    BYD: ['Song Plus','Han','Chazor'],
    Jetour: ['X70','X70 Plus','X90','Dashing'],
    Lada: ['Granta','Vesta','Niva'],
}

const COLORS = ['Oq','Qora','Kulrang','Kumush','Ko‘k','Qizil','Yashil','Sariq']
const BODY_TYPES = ['Sedan','Hatchback','Universal','SUV','Crossover','Pickup','Minivan']
const FUEL_TYPES = ['Benzin','Gaz','Benzin + Gaz','Dizel','Elektr','Gibrid']

// === DEFAULT CAR IMAGES (из AddCar.jsx) ===
const DEFAULT_CAR_IMAGES: Record<string, Record<string, string>> = {
    Chevrolet: {
        Matiz: "https://i.3dmodels.org/uploads/Daewoo/004_Daewoo_Matiz_M150_2011/Daewoo_Matiz_M150_2011_600_0005.jpg",
        Onix: "https://i.3dmodels.org/uploads/Chevrolet/300_Chevrolet_Onix_Mk2_sedan_Plus_Premier_2019/Chevrolet_Onix_Mk2_sedan_Plus_Premier_2019_1000_0005.jpg",
        Cobalt: "https://i.3dmodels.org/uploads/Chevrolet/062_Chevrolet_Cobalt_2012/Chevrolet_Cobalt_2012_600_0005.jpg",
        Gentra: "https://i.3dmodels.org/uploads/Daewoo/011_Daewoo_Gentra_2013/Daewoo_Gentra_2013_600_0005.jpg",
        Spark: "https://i.3dmodels.org/uploads/Chevrolet/004_Chevrolet_Beat_2010/Chevrolet_Beat_2010_600_0005.jpg",
        Nexia: "https://i.3dmodels.org/uploads/Daewoo/001_Daewoo_Nexia_Sedan_1996/Daewoo_Nexia_Sedan_1996_600_0005.jpg",
        Nexia_2: "https://i.3dmodels.org/uploads/Daewoo/002_Daewoo_Nexia_2012/Daewoo_Nexia_2012_600_0005.jpg",
        Nexia_3: "https://i.3dmodels.org/uploads/Ravon/003_Ravon_Nexia_2015/Ravon_Nexia_2015_600_0005.jpg",
        Malibu: "https://i.3dmodels.org/uploads/Chevrolet/083_Chevrolet_Malibu_HQinterior_2013/Chevrolet_Malibu_HQinterior_2013_600_0005.jpg",
        Malibu_2: "https://i.3dmodels.org/uploads/Chevrolet/146_Chevrolet_Malibu_Mk9_2016/Chevrolet_Malibu_Mk9_2016_600_0005.jpg",
        Tracker: "https://i.ibb.co/pF7nt5F/Chat-GPT-Image-6-2026-04-09-12.png",
        Equinox: "https://i.3dmodels.org/uploads/Chevrolet/201_Chevrolet_Equinox_Mk3_CN-spec_2018/Chevrolet_Equinox_Mk3_CN-spec_2018_600_0005.jpg",
        Damas: "https://i.3dmodels.org/uploads/Daewoo/006_Daewoo_Damas_Mk2_2012/Daewoo_Damas_Mk2_2012_600_0005.jpg",
        Monza: "https://i.3dmodels.org/uploads/Chevrolet/301_Chevrolet_Monza_Mk2_RS_2020/Chevrolet_Monza_Mk2_RS_2020_1000_0005.jpg",
        Tahoe: "https://i.3dmodels.org/uploads/Chevrolet/386_Chevrolet_Tahoe_Mk5_GMT1YC_RST_HQinterior_2025/Chevrolet_Tahoe_Mk5_GMT1YC_RST_HQinterior_2025_1000_0005.jpg",
    },
    Kia: {
        K5: "https://i.3dmodels.org/uploads/Kia/141_Kia_K5_Mk3_2019/Kia_K5_Mk3_2019_600_0005.jpg",
        K7: "https://i.3dmodels.org/uploads/Kia/043_Kia_Cadenza_2014/Kia_Cadenza_2014_600_0005.jpg",
        K8: "https://i.3dmodels.org/uploads/Kia/164_Kia_K8_2021/Kia_K8_2021_1000_0005.jpg",
        K9: "https://i.3dmodels.org/uploads/Kia/197_Kia_K9_Mk2f_RJ_2021/Kia_K9_Mk2f_RJ_2021_1000_0005.jpg",
        Sportage: "https://i.3dmodels.org/uploads/Kia/165_Kia_Sportage_Mk5_NQ5_2022/Kia_Sportage_Mk5_NQ5_2022_1000_0005.jpg",
        Rio: "https://i.3dmodels.org/uploads/Kia/152_Kia_Rio_Mk4f_YB_hatchback_2020/Kia_Rio_Mk4f_YB_hatchback_2020_1000_0005.jpg",
        Sorento: "https://i.3dmodels.org/uploads/Kia/192_Kia_Sorento_Mk4f_MQ4_2024/Kia_Sorento_Mk4f_MQ4_2024_1000_0005.jpg",
        Sonet: "https://i.3dmodels.org/uploads/Kia/222_Kia_Sonet_2024/Kia_Sonet_2024_1000_0005.jpg",
    },
    Hyundai: {
        Elantra: "https://i.3dmodels.org/uploads/Hyundai/269_Hyundai_Elantra_Mk7_CN7_US-spec_HQinterior_2020/Hyundai_Elantra_Mk7_CN7_US-spec_HQinterior_2020_1000_0005.jpg",
        Sonata: "https://i.3dmodels.org/uploads/Hyundai/193_Hyundai_Sonata_Mk8_DN8_2020/Hyundai_Sonata_Mk8_DN8_2020_600_0005.jpg",
        Tucson: "https://i.3dmodels.org/uploads/Hyundai/233_Hyundai_Tucson_Mk4_NX4_2021/Hyundai_Tucson_Mk4_NX4_2021_1000_0005.jpg",
        Santa_Fe: "https://i.3dmodels.org/uploads/Hyundai/226_Hyundai_Santa_Fe_Mk4f_TM_2021/Hyundai_Santa_Fe_Mk4f_TM_2021_1000_0005.jpg",
    },
    Toyota: {
        Camry: "https://i.3dmodels.org/uploads/Toyota/319_Toyota_Camry_XV60_XLE_hybrid_2017/Toyota_Camry_XV60_XLE_hybrid_2017_600_0005.jpg",
        Land_Cruiser_200: "https://i.3dmodels.org/uploads/Toyota/150_Toyota_Land_Cruiser_Mk8f_J200_HQinterior_2012/Toyota_Land_Cruiser_Mk8f_J200_HQinterior_2012_600_0005.jpg",
        Land_Cruiser_300: "https://i.3dmodels.org/uploads/Toyota/528_Toyota_Land_Cruiser_Mk9_J300_2021/Toyota_Land_Cruiser_Mk9_J300_2021_1000_0005.jpg",
    },
}

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
                return "Выберите марку:"
            case "model":
                return "Выберите модель:"
            case "kuzov":
                return "Выберите тип кузова:"
            case "fuel":
                return "Выберите вид топлива:"
            case "color":
                return "Выберите цвет:"
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
                <Sheet modal snapPoints={[40]} dismissOnSnapToBottom >
                    <Sheet.Frame paddingTop={"$6"} paddingVertical={"$6"} paddingLeft={"$2"} backgroundColor={"#FFF"} >
                        <Text color={"#000"} left={"$2"} bottom={"$3"} fontWeight={600}>{textOnSelect()}</Text>
                        <Sheet.ScrollView >
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
                            <Select.ItemText color={"#000"}>{item}</Select.ItemText>
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

    const models = useMemo(
        () => (form.brand ? CAR_BRANDS[form.brand] : []),
        [form.brand]
    )

    const canSave =
        form.plateNumber.length >= 6 &&
        !!form.brand &&
        !!form.model

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>
                <YStack gap="$4" top={"$7"}>

                    <Text fontSize={22} fontWeight="900" color={"#000"}>
                        Avtomobil qo‘shish
                    </Text>

                    <Image
                        source={{
                            uri: getDefaultCarImage(form.brand, form.model),
                        }}
                        style={{ height: 180, borderRadius: 18 }}
                    />

                    <TextInput
                        placeholder="01 A 777 AA"
                        value={form.plateNumber}
                        onChangeText={(v) =>
                            setForm({ ...form, plateNumber: formatPlate(v) })
                        }
                        style={styles.inputStyle}
                    />

                    <AppSelect
                        placeholder="Марка"
                        id={"marka"}
                        value={form.brand}
                        items={Object.keys(CAR_BRANDS)}
                        onChange={(brand) =>
                            setForm({ ...form, brand, model: null })
                        }
                    />

                    <AppSelect
                        placeholder="Модель"
                        id={"model"}
                        value={form.model}
                        items={models}
                        disabled={!form.brand}
                        onChange={(model) =>
                            setForm({ ...form, model })
                        }
                    />

                    <AppSelect
                        placeholder="Цвет"
                        id={"color"}
                        value={form.color}
                        items={COLORS}
                        onChange={(color) =>
                            setForm({ ...form, color })
                        }
                    />

                    <AppSelect
                        placeholder="Тип кузова"
                        id={"kuzov"}
                        value={form.bodyType}
                        items={BODY_TYPES}
                        onChange={(bodyType) =>
                            setForm({ ...form, bodyType })
                        }
                    />

                    <AppSelect
                        placeholder="Тип топлива"
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
                    disabled={!canSave}
                    onPress={() => {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                        router.back()
                    }}
                    style={[styles.saveBtn, { opacity: canSave ? 1 : 0.4 }]}
                >
                    <Text color="white" fontWeight="700">
                        Avtomobil qo‘shish
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
        bottom: 0,
        padding: 16,
        backgroundColor: '#EEE',
    },
    saveBtn: {
        height: 56,
        borderRadius: 18,
        backgroundColor: '#4D77FF',
        alignItems: 'center',
        justifyContent: 'center',
    }
})
