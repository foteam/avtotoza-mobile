import { Sheet, YStack, Text, Spinner } from 'tamagui'
import {rgba} from "color2k";
import i18n from "@/i18n";

type Props = {
    open: boolean
}

export function BookingLoadingOverlay({ open }: Props) {
    return (
        <Sheet
            modal
            open={open}
            snapPoints={[100]}
            dismissOnSnapToBottom={false}
            zIndex={99999}
        >
            <Sheet.Overlay />
            <Sheet.Frame backgroundColor={"#006cff"}>
                <YStack
                    flex={1}
                    alignItems="center"
                    justifyContent="center"
                    gap="$3"
                >
                    <Spinner size="large" color={"white"} />
                    <Text fontSize="$5" fontWeight="600" color="white">
                        {i18n.t('booking.bookingModal.loadingBookingTitle')}
                    </Text>
                    <Text color="white" fontSize="$3">
                        {i18n.t('booking.bookingModal.loadingBookingDescription')}
                    </Text>
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}
