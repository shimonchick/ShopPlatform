import {Category} from '../../../models/product';

export const possibleCategories: ({ name: string; subCategories: ({ name: string; fields: { templateOptions: { label: string; required: boolean }; type: string; key: string }[] } | string)[] } | { name: string; subCategories: string[] } | { name: string; subCategories: any[] })[] = [
    {
        name: 'Real estate',
        subCategories: [

            {
                name: 'Sales',
                fields: [
                    {
                        key: 'type',
                        type: 'select',
                        templateOptions: {
                            label: 'Type of apartment',
                            description: 'Type of apartment',
                            required: true,
                            options: [
                                {value: 1, label: 'One room'},
                                {value: 2, label: 'Two rooms'},
                                {value: 3, label: 'Three rooms'},
                                {value: 4, label: 'Four rooms'},
                                {value: 5, label: 'Many rooms'},
                                {value: 6, label: 'maisonette'},
                            ],
                        },
                    },
                    {
                        key: 'area',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Area',
                            placeholder: 'Area',
                            description: 'Area of the apartment'
                        }
                    },
                    {
                        key: 'yearBuilt',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Year built',
                            placeholder: 'eg. 2010...',
                            description: 'Year the building was built'
                        }
                    },
                    {
                        key: 'constructionType',
                        type: 'select',
                        templateOptions: {
                            required: true,
                            label: 'Construction type',
                            options: [
                                {value: 1, label: 'Bricks'},
                                {value: 2, label: 'Panels'},
                                {value: 3, label: 'EPC'},
                                {value: 4, label: 'PC'},
                                {value: 5, label: 'Trimmer joists'},
                            ]
                        }
                    },
                    {
                        key: 'floor',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Building floor',
                            placeholder: 'Eg. 3 ...',
                            description: 'At which floor is the apartment located'
                        }
                    },
                    {
                        key: 'totalFloors',
                        type: 'input',
                        templateOptions: {
                            required: true,
                            label: 'Total building floors',
                            placeholder: 'Eg. 5 ..',
                            description: 'How many floors does the building have in total'
                        }
                    },
                    {
                        key: 'heating',
                        type: 'select',
                        templateOptions: {
                            required: true,
                            label: 'Heating type',
                            options: [
                                {value: 1, label: 'Electricity'},
                                {value: 2, label: 'Gas'},
                                {value: 3, label: 'Solar'},
                                {value: 4, label: 'Fireplace/chimney'},
                                {value: 5, label: 'None'},
                            ]
                        }
                    }
                ]
            },
            {
                name: 'Outside the country',
                fields: [
                    {}
                ]
            },
            {
                name: 'Rent',
                fields: [
                    {}
                ]
            },
            {
                name: 'Housemates',
                fields: [
                    {}
                ]
            }
        ]
    },
    {
        name: 'Vehicles, caravans, boats',
        subCategories: [
            'Parts',
            'Accessories',
            'Trailers, wagons, others',
            'Caravans',
            'Tyres',
            'Agro, building, parts',
            'Auto services, '
        ]
    },
    {
        name: 'Electronics',
        subCategories: [
            'Computers',
            'Phones',
            'Audio',
            'Photo/ Video',
            'Computer accessories/ parts',
            'Phone accessories',
            'Home appliances',
            'Navigation',
            'Tablets/ Readers',
            'Televisions',
            'Air conditioners'
        ]
    },
    {
        name: 'Sports, Books, Hobby',
        subCategories: [
            'Sport goods',
            'Music',
            'Musical instruments',
            'Games',
            'Tourism, camping, fishing',
            'Films',
            'Tobacco, lighters, nargile',
            'Books',
            'Antiques and collections',
            'Tickets, events'
        ]
    },
    {
        name: 'Animals',
        subCategories: [
            'Dogs',
            'Birds',
            'Lost/ found',
            'Cats',
            'Farm animals',
            'Animal goods',
            'Fish',
            'Other',
            'Looking for a mate'
        ]
    },
    {
        name: 'Home and garden',
        subCategories: [
            'Furniture',
            'Domestic needs',
            'Linen, textile',
            'Custom furniture',
            'Domestic workman',
            'Curtains, carpets',
            'Garden',
            'Food, add-ons, drinks',
            'Household appliances',
            'Art, decoration',
            'Lighting',
            'Cleaning',
            'Wheelchairs, aids'
        ]
    },
    {
        name: 'Fashion',
        subCategories: [
            'Clothes',
            'Toiletry and perfumery',
            'Sewing services',
            'Shoes',
            'Jewellery',
            'Accessories',
            'Watches',

        ]
    },
    {
        name: 'Babies and children',
        subCategories: [
            'Clothes',
            'Toys',
            'Goods for twins',
            'Shoes',
            'Furniture',
            'Others',
            'Baby carts',
            'Accessories',
            'Nursery, children centers'
        ]
    },
    {
        name: 'Excursions, holidays',
        subCategories: [
            'Sea',
            'Spa',
            'Mountain',
            'Village, guest houses',
            'Abroad'
        ]
    },
    {
        name: 'Services',
        subCategories: [
            'Gardening',
            'Landscaping',
            'Hairdressing',
            'Babysitting',
            'Children centers',
            'Animals',
            'Business partnerships',
            'Courses',
            'Training',
            'Dressmaking',
            'Medical',
            'Dental',
            'Carers, hospices',
            'Auto, rent-a-car',
            'Repair',
            'Transport',
            'Wedding, catering, events',
            'Business',
            'Security, detective',
        ]
    },
    {
        name: 'Machines, instruments, equipment',
        subCategories: [
            'Machines, industrial equipment',
            'Commercial equipment',
            'Tools'
        ]
    },
    {
        name: 'Work',
        subCategories: [
            'Hotels, Restaurants, Tourism',
            'Production, construction',
            'Trade',
            'Health, beauty',
            'Cleaning, household',
            'Transport, Logistics, forwarding',
            'Administrative, office activities',
            'Security, IT',
            'Economy, Law, HR',
            'Advertising, marketing',
            'Distribution, homework',
            'Other'
        ]
    },
    {
        name: 'Free',
        subCategories: []
    }
];
// todo make them objects that contain a url of the icon as well
// todo add more categories
// todo take those from firebase
