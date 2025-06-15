import { Particle } from '../Particle';
import { Color, combineRGBComponents } from '../ParticleUtils';
import { PropertyList } from '../PropertyList';
import { PropertyNode, ValueList } from '../PropertyNode';
import { BehaviorOrder, IEmitterBehavior } from './Behaviors';
import { BehaviorEditorConfig } from './editor/Types';

/**
 * A Color behavior that applies an interpolated or stepped list of values to the particle's tint property.
 *
 * Example config:
 * ```javascript
 * {
 *     type: 'color',
 *     config: {
 *         color: {
 *              list: [{value: '#ff0000' time: 0}, {value: '#00ff00', time: 0.5}, {value: '#0000ff', time: 1}]
 *         },
 *     }
 * }
 * ```
 */
export class LifetimeBehavior implements IEmitterBehavior
{
    public static type = 'lifetime';
    public static editorConfig: BehaviorEditorConfig = null;

    public order = BehaviorOrder.Lifetime;
    private list: PropertyList<number>;
    constructor(config: {
        /**
         * Color of the particles as 6 digit hex codes.
         */
        lifetime: ValueList<number>
    })
    {
        this.list = new PropertyList(false);
        this.list.reset(PropertyNode.createList(config.lifetime));
    }

    initParticles(first: Particle): void
    {
        let next = first;
        let count = 0;

        while (next)
        {
            ++count;
            next = next.next;
        }

        next = first;

        const delta = 1 / count;
        let proportion = 0;
        while(next){
            next.init(this.list.interpolate(proportion))
            proportion += delta;
            next = next.next;
        }
    }
}

/**
 * A Color behavior that applies a single color to the particle's tint property at initialization.
 *
 * Example config:
 * ```javascript
 * {
 *     type: 'colorStatic',
 *     config: {
 *         color: '#ffff00',
 *     }
 * }
 * ```
 */
export class StaticLifetimeBehavior implements IEmitterBehavior
{
    public static type = 'lifetimeStatic';
    public static editorConfig: BehaviorEditorConfig = null;

    public order = BehaviorOrder.Lifetime;
    private minlifetime: number;
    private maxlifetime: number;
    constructor(config: {
        /**
         * Color of the particles as 6 digit hex codes.
         */
        minlifetime: number;

        maxlifetime: number;
    })
    {
        this.minlifetime = config.minlifetime;
        this.maxlifetime = config.maxlifetime;
    }

    initParticles(first: Particle): void
    {
        let next = first;

        while (next)
        {
            let lifetime: number;
            if(this.minlifetime === this.maxlifetime){
                lifetime = this.minlifetime;
            }
            else{
                lifetime = (Math.random() * (this.maxlifetime - this.minlifetime)) + this.minlifetime;
            }
            next.init(lifetime)
            next = next.next;
        }
    }
}
