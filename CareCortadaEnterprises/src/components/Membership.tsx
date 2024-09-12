import { memberships } from '../products/memberships';

interface Membership {
    tier: string;
    price: string;
    benefits: string[];
}


const Membership = () => {
    return (
        <div className="bg-complement2 shadow-sm transition-transform transform hover:shadow-lg min-h-screen">
            <div className="ml-4 mr-4">
            <h1 className="text-3xl font-bold mb-6 mt-4">Exclusive Membership Tiers</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {memberships.map((membership: Membership, index: number) => (
                    <div key={index} className="border p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold mb-2">{membership.tier}</h2>
                        <p className="text-lg font-semibold mb-4">{membership.price}</p>
                        <ul className="list-disc ml-5">
                            {membership.benefits.map((benefit, i) => (
                                <li key={i}>{benefit}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
};

export default Membership;
