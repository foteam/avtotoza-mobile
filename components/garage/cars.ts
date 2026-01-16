

export const COLORS = ['Oq','Qora','Kulrang','Kumush','Ko‘k','Qizil','Yashil','Sariq']
export const BODY_TYPES = ['Sedan','Hatchback','Universal','SUV','Crossover','Pickup','Minivan']
export const FUEL_TYPES = ['Benzin','Gaz','Benzin + Gaz','Dizel','Elektr','Gibrid']

// === DEFAULT CAR IMAGES (из AddCar.jsx) ===
export const CAR_BRANDS: Record<string, string[]> = {
    Chevrolet: ['Cobalt','Gentra','Nexia','Nexia 2','Nexia 3','Malibu','Malibu 2','Tahoe','Tracker','Onix','Spark','Lacetti','Damas','Equinox','Monza','Matiz'],
    Kia: ['K5','K7','K8','K9','Sportage','Sorento','Seltos','Rio','Sonet', 'EV6', 'EV9', 'Ray Ev', "Carnival", "Telluride XPro"],
    Hyundai: ['Elantra','Sonata','Tucson','Santa Fe','Accent'],
    Toyota: ['Camry','Land Cruiser 200','Land Cruiser 300'],
    Land_Rover: ['Range Rover Autobiography', 'Defender 90', 'Defender 110', 'Discovery P360', 'Discovery Sport'],
    BYD: ['Song Plus','Han','Chazor'],
    Jetour: ['X70','X70 Plus','X90','Dashing'],
    Lada: ['Granta','Vesta','Niva'],
}
export const DEFAULT_CAR_IMAGES: Record<string, Record<string, string>> = {
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
        EV6: "https://i.3dmodels.org/uploads/Kia/160_Kia_EV6_2022/Kia_EV6_2022_1000_0005.jpg",
        EV9: "https://i.3dmodels.org/uploads/Kia/186_Kia_EV9_2023/Kia_EV9_2023_1000_0005.jpg",
        Ray_EV: "https://i.3dmodels.org/uploads/Kia/196_Kia_Ray_EV_2023/Kia_Ray_EV_2023_1000_0005.jpg",
        Carnival: "https://i.3dmodels.org/uploads/Kia/151_Kia_Carnival_Mk4_KA4_2021/Kia_Carnival_Mk4_KA4_2021_1000_0005.jpg",
        Telluride_XPRO: "https://i.3dmodels.org/uploads/Kia/190_Kia_Telluride_Mk1f_X-Pro_2023/Kia_Telluride_Mk1f_X-Pro_2023_1000_0005.jpg"
    },
    Land_Rover: {
        Range_Rover_Autobiography: "https://i.3dmodels.org/uploads/Land-Rover/063_Land-Rover_Range_Rover_Mk5_L460_Autobiography_2022/Land-Rover_Range_Rover_Mk5_L460_Autobiography_2022_1000_0005.jpg",
        Defender_90: "https://i.3dmodels.org/uploads/Land-Rover/058_Land-Rover_Defender_Mk2_90_2020/Land-Rover_Defender_Mk2_90_2020_600_0005.jpg",
        Defender_110: "https://i.3dmodels.org/uploads/Land-Rover/057_Land-Rover_Defender_Mk2_110_Explorer_Pack_2020/Land-Rover_Defender_Mk2_110_Explorer_Pack_2020_600_0005.jpg",
        Discovery_P360: "https://i.3dmodels.org/uploads/Land-Rover/061_Land-Rover_Discovery_Mk5f_P360_R-Dynamic_2021/Land-Rover_Discovery_Mk5f_P360_R-Dynamic_2021_1000_0005.jpg",
        Discovery_Sport: "https://i.3dmodels.org/uploads/Land-Rover/072_Land-Rover_Range_Rover_Sport_Mk3_L461_P510e_First_Edition_2022/Land-Rover_Range_Rover_Sport_Mk3_L461_P510e_First_Edition_2022_1000_0005.jpg"
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
