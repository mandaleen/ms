import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/contexts/SessionContext';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const Login = () => {
    const { session } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (session) {
            navigate('/');
        }
    }, [session, navigate]);

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-secondary/30 p-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                    <div className="text-center mb-8">
                        <span className="text-5xl" role="img" aria-label="orange">🍊</span>
                        <h1 className="text-3xl font-bold font-display mt-4">Welcome to Mandaleen</h1>
                        <p className="text-muted-foreground mt-2">Sign in or create an account to continue</p>
                    </div>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        providers={['google']}
                        theme="dark"
                        redirectTo="/"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Login;