import { IPackage } from "../app/modules/package/package.interface";
import stripe from "../config/stripe";

export const createSubscriptionProduct = async (
    payload:Partial<IPackage>):Promise<{ priceId: string, productId: string } | null> =>{

    const product = await stripe.products.create({
        name: payload.title as string,
        description: payload.description as string,
    });
    
    const duration: 'month' | 'year' = 
        payload.duration === 'month' || 
        payload.duration === 'year' ? payload.duration : 'month';

    const price = await stripe.prices.create({
        product: product.id,
        unit_amount: Number(payload.price) * 100,
        currency: 'usd', 
        recurring: { interval: duration },
    });

    return { priceId: price.id, productId: product.id };
}