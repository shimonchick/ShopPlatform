import {Category} from '../../../models/product';

export const possibleCategories: Category[] = [
    {
        name: 'Real estate',
        subCategories: [
            'Sales',
            'In the country',
            'Rent',
            'Housemates'
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
