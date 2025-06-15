import { LifetimeBehavior, StaticLifetimeBehavior } from '../../Lifetime';

LifetimeBehavior.editorConfig = {
    category: 'other',
    title: 'Interpolated Lifetime',
    props: [
        {
            type: 'numberList',
            name: 'lifetimeList',
            title: 'lifetime',
            description: 'None.',
            default: 1,
        },
    ],
};

StaticLifetimeBehavior.editorConfig = {
    category: 'other',
    title: 'Static lifetime',
    props: [
        {
            type: 'number',
            name: 'minlifetime',
            title: 'lifetime',
            description: 'None',
            default: 0,
        },
        {
            type: 'number',
            name: 'maxlifetime',
            title: 'lifetime',
            description: 'None',
            default: 0,
        },
    ],
};
