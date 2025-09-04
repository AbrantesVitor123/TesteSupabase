
import React, { useState, useEffect, useCallback } from 'react';
import { getClickCount, updateClickCount } from './services/supabaseService';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import CounterDisplay from './components/CounterDisplay';
import ClickButton from './components/ClickButton';

const App: React.FC = () => {
  const [count, setCount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const fetchInitialCount = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const initialCount = await getClickCount();
      setCount(initialCount);
    } catch (err: unknown) {
        if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred.');
        }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialCount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleIncrement = async () => {
    if (isUpdating || count === null) return;
    
    setIsUpdating(true);
    const newCount = count + 1;
    setCount(newCount); // Optimistic UI update

    try {
      await updateClickCount(newCount);
      setError(null); // Clear previous errors on successful update
    } catch (err: unknown) {
      setCount(count); // Revert optimistic update on failure
      if (err instanceof Error) {
            setError(err.message);
        } else {
            setError('An unknown error occurred while saving.');
        }
    } finally {
      setIsUpdating(false);
    }
  };
  
  const renderContent = () => {
    if (isLoading) {
        return <LoadingSpinner />;
    }
    
    if (error && count === null) { // Show main error only if count fails to load initially
        return <ErrorMessage message={error} />;
    }

    return (
        <div className="flex flex-col items-center gap-12">
            <CounterDisplay count={count} />
            <ClickButton onClick={handleIncrement} disabled={isUpdating} />
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <main className="w-full max-w-md mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-cyan-500/10 p-8 border border-gray-700">
            <h1 className="text-4xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Supabase Click Counter
            </h1>
            <p className="text-center text-gray-400 mb-10">
                Every click is saved and retrieved from a Supabase database.
            </p>
            {renderContent()}
        </main>
        <footer className="text-center text-gray-600 text-sm mt-8">
            <p>Powered by React, Tailwind CSS, and Supabase.</p>
        </footer>
    </div>
  );
};

export default App;
