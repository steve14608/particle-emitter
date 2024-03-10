import { BlendModeBehavior } from '../../BlendMode';

BlendModeBehavior.editorConfig = {
    category: 'blend',
    title: 'Blend Mode',
    props: [
        {
            type: 'blend',
            name: 'blendMode',
            title: 'Blend Mode',
            description: 'Blend mode of all particles. IMPORTANT - The WebGL renderer only supports the Normal, '
                + 'Add, Multiply and Screen blend modes. Anything else will silently act like Normal.',
            default: 'normal',
        },
    ],
};
