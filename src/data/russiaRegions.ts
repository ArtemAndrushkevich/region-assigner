// Data for all 85 regions of the Russian Federation
// Each region has an id, name, timezone, and optional assigned employee

export interface RegionData {
  id: string;
  name: string;
  timezone: string;
  employee?: string;
  color?: string;
}

export const russiaRegions: RegionData[] = [
  // Central Federal District
  { id: "RU-BEL", name: "Белгородская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-BRY", name: "Брянская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-VLA", name: "Владимирская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-VOR", name: "Воронежская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-IVA", name: "Ивановская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KLU", name: "Калужская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KOS", name: "Костромская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KRS", name: "Курская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-LIP", name: "Липецкая область", timezone: "UTC+3 (MSK)" },
  { id: "RU-MOS", name: "Московская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-MOW", name: "Москва", timezone: "UTC+3 (MSK)" },
  { id: "RU-ORL", name: "Орловская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-RYA", name: "Рязанская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-SMO", name: "Смоленская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-TAM", name: "Тамбовская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-TVE", name: "Тверская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-TUL", name: "Тульская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-YAR", name: "Ярославская область", timezone: "UTC+3 (MSK)" },
  
  // Northwestern Federal District
  { id: "RU-ARK", name: "Архангельская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-VLG", name: "Вологодская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KGD", name: "Калининградская область", timezone: "UTC+2 (MSK-1)" },
  { id: "RU-KR", name: "Республика Карелия", timezone: "UTC+3 (MSK)" },
  { id: "RU-KO", name: "Республика Коми", timezone: "UTC+3 (MSK)" },
  { id: "RU-LEN", name: "Ленинградская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-MUR", name: "Мурманская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-NEN", name: "Ненецкий АО", timezone: "UTC+3 (MSK)" },
  { id: "RU-NGR", name: "Новгородская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-PSK", name: "Псковская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-SPE", name: "Санкт-Петербург", timezone: "UTC+3 (MSK)" },
  
  // Southern Federal District
  { id: "RU-AD", name: "Республика Адыгея", timezone: "UTC+3 (MSK)" },
  { id: "RU-AST", name: "Астраханская область", timezone: "UTC+4 (MSK+1)" },
  { id: "RU-VGG", name: "Волгоградская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KL", name: "Республика Калмыкия", timezone: "UTC+3 (MSK)" },
  { id: "RU-KDA", name: "Краснодарский край", timezone: "UTC+3 (MSK)" },
  { id: "RU-ROS", name: "Ростовская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-KRM", name: "Республика Крым", timezone: "UTC+3 (MSK)" },
  { id: "RU-SEV", name: "Севастополь", timezone: "UTC+3 (MSK)" },
  
  // North Caucasian Federal District
  { id: "RU-DA", name: "Республика Дагестан", timezone: "UTC+3 (MSK)" },
  { id: "RU-IN", name: "Республика Ингушетия", timezone: "UTC+3 (MSK)" },
  { id: "RU-KB", name: "Кабардино-Балкарская Республика", timezone: "UTC+3 (MSK)" },
  { id: "RU-KC", name: "Карачаево-Черкесская Республика", timezone: "UTC+3 (MSK)" },
  { id: "RU-SE", name: "Республика Северная Осетия", timezone: "UTC+3 (MSK)" },
  { id: "RU-STA", name: "Ставропольский край", timezone: "UTC+3 (MSK)" },
  { id: "RU-CE", name: "Чеченская Республика", timezone: "UTC+3 (MSK)" },
  
  // Volga Federal District
  { id: "RU-BA", name: "Республика Башкортостан", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-KIR", name: "Кировская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-ME", name: "Республика Марий Эл", timezone: "UTC+3 (MSK)" },
  { id: "RU-MO", name: "Республика Мордовия", timezone: "UTC+3 (MSK)" },
  { id: "RU-NIZ", name: "Нижегородская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-ORE", name: "Оренбургская область", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-PNZ", name: "Пензенская область", timezone: "UTC+3 (MSK)" },
  { id: "RU-PER", name: "Пермский край", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-SAM", name: "Самарская область", timezone: "UTC+4 (MSK+1)" },
  { id: "RU-SAR", name: "Саратовская область", timezone: "UTC+4 (MSK+1)" },
  { id: "RU-TA", name: "Республика Татарстан", timezone: "UTC+3 (MSK)" },
  { id: "RU-UD", name: "Удмуртская Республика", timezone: "UTC+4 (MSK+1)" },
  { id: "RU-ULY", name: "Ульяновская область", timezone: "UTC+4 (MSK+1)" },
  { id: "RU-CU", name: "Чувашская Республика", timezone: "UTC+3 (MSK)" },
  
  // Ural Federal District
  { id: "RU-KGN", name: "Курганская область", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-SVE", name: "Свердловская область", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-TYU", name: "Тюменская область", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-KHM", name: "Ханты-Мансийский АО", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-YAN", name: "Ямало-Ненецкий АО", timezone: "UTC+5 (MSK+2)" },
  { id: "RU-CHE", name: "Челябинская область", timezone: "UTC+5 (MSK+2)" },
  
  // Siberian Federal District
  { id: "RU-AL", name: "Республика Алтай", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-ALT", name: "Алтайский край", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-BU", name: "Республика Бурятия", timezone: "UTC+8 (MSK+5)" },
  { id: "RU-IRK", name: "Иркутская область", timezone: "UTC+8 (MSK+5)" },
  { id: "RU-KEM", name: "Кемеровская область", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-KK", name: "Республика Хакасия", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-KYA", name: "Красноярский край", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-NVS", name: "Новосибирская область", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-OMS", name: "Омская область", timezone: "UTC+6 (MSK+3)" },
  { id: "RU-TOM", name: "Томская область", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-TY", name: "Республика Тыва", timezone: "UTC+7 (MSK+4)" },
  { id: "RU-ZAB", name: "Забайкальский край", timezone: "UTC+9 (MSK+6)" },
  
  // Far Eastern Federal District
  { id: "RU-AMU", name: "Амурская область", timezone: "UTC+9 (MSK+6)" },
  { id: "RU-YEV", name: "Еврейская АО", timezone: "UTC+10 (MSK+7)" },
  { id: "RU-KAM", name: "Камчатский край", timezone: "UTC+12 (MSK+9)" },
  { id: "RU-MAG", name: "Магаданская область", timezone: "UTC+11 (MSK+8)" },
  { id: "RU-PRI", name: "Приморский край", timezone: "UTC+10 (MSK+7)" },
  { id: "RU-SA", name: "Республика Саха (Якутия)", timezone: "UTC+9-11 (MSK+6-8)" },
  { id: "RU-SAK", name: "Сахалинская область", timezone: "UTC+11 (MSK+8)" },
  { id: "RU-KHA", name: "Хабаровский край", timezone: "UTC+10 (MSK+7)" },
  { id: "RU-CHU", name: "Чукотский АО", timezone: "UTC+12 (MSK+9)" },
];

// Helper function to get region by ID
export const getRegionById = (id: string): RegionData | undefined => {
  return russiaRegions.find(region => region.id === id);
};

// Helper function to get all region names for dropdown
export const getRegionNames = (): { id: string; name: string }[] => {
  return russiaRegions
    .map(region => ({ id: region.id, name: region.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ru'));
};
