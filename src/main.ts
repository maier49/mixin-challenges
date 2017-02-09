export class GenericClass<T> {
	value: T;
}
export interface GenericTrait<T> {
	newGenericValue: T;
}

export type Constructor<T> = new (...args: any[]) => T;
export type Constructable = new (...args: any[]) => object;

export function MixinGeneric<C extends GenericClass<any>>(base: Constructor<C>): { new <T>(): (GenericClass<T> & GenericTrait<T> & C) } {
	return <any> class extends (base as Constructor<GenericClass<any>>) {
		newGenericValue: any;
		constructor(...args: any[]) {
			super(...args);
		}
	};
}

export function SimpleMixin<C extends Constructable>(base: C): C & Constructor<GenericTrait<any>> {
	return class extends base {
		newGenericValue: any;
		constructor(...args: any[]) {
			super(...args);
		}
	};
}

class Child<T> extends GenericClass<T> {
	child: T;
	constructor(options: { childValue: string }) {
		super();
	}
}

const MixedClass = MixinGeneric(Child);
// Child constructor is lost
// let mixedInstance = new MixedClass<string>({ childValue: 'value' });
let mixedInstance = new MixedClass<string>();
// Child generic type is lost
mixedInstance.child = { any: 'value' };
// New generic type is maintained
// mixedInstance.newGenericValue = { anything: 'value' };

const SimpleMixedClass = SimpleMixin(Child);

let simpleMixedInstance = new SimpleMixedClass<string>({ childValue: 'three' });
// Constructor is maintained
// new SimpleMixedClass(3);
// Generic is maintained
// simpleMixedInstance.child = 3;
// New generic is lost
simpleMixedInstance.newGenericValue = 3;
