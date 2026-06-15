import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const PricingPage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [processingId, setProcessingId] = useState(null); // Tracks WHICH plan is processing
  const [successMsg, setSuccessMsg] = useState('');

  const plans = [
    { id: 1, name: 'Starter', price: '$99', credits: 1000, features: ['1000 Generations', 'Standard Resolution', 'Personal License'] },
    { id: 2, name: 'Pro', price: '$199', credits: 2500, popular: true, features: ['2500 Generations', 'High Resolution', 'Commercial License', 'Priority Queue'] },
    { id: 3, name: 'Enterprise', price: '$1999', credits: 30000, features: ['30,000 Generations', 'Ultra 4K Resolution', 'Full Copyright Ownership', 'API Access'] },
  ];

  const handlePurchase = async (plan) => {
    setProcessingId(plan.id);
    setSuccessMsg('');

    try {
      // Dummy processing wait time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Tell backend how many credits to add
      const response = await axios.post('http://localhost:5000/api/payment/verify', {
        creditsToAdd: plan.credits
      });

      // Update user context
      setUser({ ...user, credits: response.data.credits });
      setSuccessMsg(`Successfully purchased ${plan.name} Plan! Added ${plan.credits} ⚡`);
      
    } catch (err) {
      alert('Dummy payment failed.');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white mb-4">Choose Your Plan</h2>
        <p className="text-slate-400 text-lg">Fuel your creativity with the credits you need.</p>
        
        {successMsg && (
          <div className="mt-6 inline-block rounded-lg bg-teal-500/10 px-6 py-3 text-sm font-medium text-teal-400 border border-teal-500/20">
            {successMsg}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`relative rounded-2xl bg-slate-800 p-8 flex flex-col border ${plan.popular ? 'border-teal-500 shadow-lg shadow-teal-500/20' : 'border-slate-700/50'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-linear-to-r from-teal-500 to-blue-600 px-4 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Most Popular
              </div>
            )}
            
            <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-4xl font-black text-white mb-6">{plan.price}</div>
            
            <ul className="mb-8 flex-1 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-slate-300">
                  <svg className="mr-3 h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handlePurchase(plan)}
              disabled={processingId !== null}
              className={`w-full rounded-xl py-4 font-bold transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                plan.popular 
                  ? 'bg-linear-to-r from-teal-500 to-blue-600 text-white hover:opacity-90' 
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {processingId === plan.id ? 'Processing purchase...' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPage;