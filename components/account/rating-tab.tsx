interface RatingTabProps {
    walletPoints: number
}

export function RatingTab({ walletPoints }: RatingTabProps) {
    return (
        <div className="space-y-4">
            <div className="border-2 border-[#00AA78] rounded-2xl p-8">
                <h3 className="text-xl font-semibold mb-6 text-black">Your Rating & Points</h3>
                <div className="p-4 bg-gradient-to-r from-[#00AA78] to-[#008A5E] rounded-lg text-white">
                    <p className="text-sm opacity-90 mb-1">Wallet Points</p>
                    <p className="text-4xl font-bold">{walletPoints}</p>
                </div>
                <p className="text-gray-600 mt-4 text-sm">Earn points with every purchase and redeem them for discounts!</p>
            </div>
        </div>
    )
}
