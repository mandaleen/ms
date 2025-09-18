import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@/contexts/SessionContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { showError, showSuccess } from '@/utils/toast';

// --- HELPER COMPONENTS (ICONS) ---
const GoogleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
        <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
    </svg>
);

// --- TYPE DEFINITIONS ---
interface Testimonial {
  avatarSrc: string;
  name: string;
  handle: string;
  text: string;
}

// --- SUB-COMPONENTS ---
const GlassInputWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="rounded-xl border border-border bg-card/60 backdrop-blur-sm transition-colors focus-within:border-primary focus-within:bg-primary/10">
    {children}
  </div>
);

const TestimonialCard = ({ testimonial, delay }: { testimonial: Testimonial, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
    className="flex items-start gap-3 rounded-2xl bg-card/40 backdrop-blur-xl border border-white/10 p-5 w-64"
  >
    <img src={testimonial.avatarSrc} className="h-10 w-10 object-cover rounded-lg" alt="avatar" />
    <div className="text-sm leading-snug">
      <p className="flex items-center gap-1 font-medium">{testimonial.name}</p>
      <p className="text-muted-foreground">{testimonial.handle}</p>
      <p className="mt-1 text-foreground/80">{testimonial.text}</p>
    </div>
  </motion.div>
);

const sampleTestimonials: Testimonial[] = [
  {
    avatarSrc: "https://randomuser.me/api/portraits/women/57.jpg",
    name: "Sarah Chen",
    handle: "@sarahdigital",
    text: "Amazing platform! The user experience is seamless and the features are exactly what I needed."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/64.jpg",
    name: "Marcus Johnson",
    handle: "@marcustech",
    text: "This service has transformed how I work. Clean design, powerful features, and excellent support."
  },
  {
    avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "David Martinez",
    handle: "@davidcreates",
    text: "I've tried many platforms, but this one stands out. Intuitive, reliable, and genuinely helpful for productivity."
  },
];

const Login = () => {
    const { session } = useSession();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);

    useEffect(() => {
        if (session) {
            navigate("/");
        }
    }, [session, navigate]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const authFunction = isSignUp ? supabase.auth.signUp : supabase.auth.signInWithPassword;
        const { error } = await authFunction({ email, password });

        if (error) {
            showError(error.message);
        } else {
            if (isSignUp) {
                showSuccess("Please check your email to verify your account.");
                setIsSignUp(false);
            } else {
                showSuccess("You are now signed in.");
                navigate('/');
            }
        }
    };

    const handleGoogleSignIn = async () => {
        const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
        if (error) {
            showError(error.message);
        }
    };
    
    const handleResetPassword = () => {
        showError("Password reset functionality is not yet implemented.");
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    };

    const description = isSignUp ? "Join us and start managing your classes efficiently." : "Access your account and continue your journey with us.";
    const heroImageSrc = "https://images.unsplash.com/photo-1642615835477-d303d7dc9ee9?w=2160&q=80";

    return (
        <div className="h-screen flex flex-col md:flex-row font-sans w-screen overflow-hidden">
            <section className="flex-1 flex items-center justify-center p-8 bg-secondary/30">
                <motion.div 
                    className="w-full max-w-md"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col gap-6">
                        <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-display font-semibold leading-tight">
                            {isSignUp ? "Create an Account" : "Welcome to Mandaleen"}
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-muted-foreground">{description}</motion.p>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            <motion.div variants={itemVariants}>
                                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                                <GlassInputWrapper>
                                    <Input name="email" type="email" placeholder="Enter your email address" className="w-full bg-transparent text-sm p-4 h-auto rounded-xl focus:outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                                </GlassInputWrapper>
                            </motion.div>

                            <motion.div variants={itemVariants}>
                                <label className="text-sm font-medium text-muted-foreground">Password</label>
                                <GlassInputWrapper>
                                    <div className="relative">
                                        <Input name="password" type={showPassword ? 'text' : 'password'} placeholder="Enter your password" className="w-full bg-transparent text-sm p-4 h-auto pr-12 rounded-xl focus:outline-none border-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-3 flex items-center">
                                            {showPassword ? <EyeOff className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /> : <Eye className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />}
                                        </button>
                                    </div>
                                </GlassInputWrapper>
                            </motion.div>

                            {!isSignUp && (
                                <motion.div variants={itemVariants} className="flex items-center justify-between text-sm">
                                    <label htmlFor="rememberMe" className="flex items-center gap-2 cursor-pointer">
                                        <Checkbox id="rememberMe" name="rememberMe" />
                                        <span className="text-foreground/90">Keep me signed in</span>
                                    </label>
                                    <a href="#" onClick={(e) => { e.preventDefault(); handleResetPassword(); }} className="hover:underline text-primary transition-colors">Reset password</a>
                                </motion.div>
                            )}

                            <motion.div variants={itemVariants}>
                                <Button type="submit" className="w-full rounded-xl h-auto py-4 font-medium text-base">
                                    {isSignUp ? 'Sign Up' : 'Sign In'}
                                </Button>
                            </motion.div>
                        </form>

                        <motion.div variants={itemVariants} className="relative flex items-center justify-center">
                            <span className="w-full border-t border-border"></span>
                            <span className="px-4 text-sm text-muted-foreground bg-secondary/30 absolute">Or continue with</span>
                        </motion.div>

                        <motion.div variants={itemVariants}>
                            <Button onClick={handleGoogleSignIn} variant="outline" className="w-full flex items-center justify-center gap-3 border-border rounded-xl h-auto py-4 hover:bg-accent">
                                <GoogleIcon />
                                Continue with Google
                            </Button>
                        </motion.div>

                        <motion.p variants={itemVariants} className="text-center text-sm text-muted-foreground">
                            {isSignUp ? "Already have an account?" : "New to our platform?"}
                            <a href="#" onClick={(e) => { e.preventDefault(); setIsSignUp(!isSignUp); }} className="text-primary hover:underline transition-colors ml-1">
                                {isSignUp ? 'Sign In' : 'Create Account'}
                            </a>
                        </p>
                    </div>
                </motion.div>
            </section>

            <section className="hidden md:block flex-1 relative p-4 bg-background">
                <motion.div 
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                    className="absolute inset-4 rounded-2xl bg-cover bg-center" 
                    style={{ backgroundImage: `url(${heroImageSrc})` }}
                ></motion.div>
                {sampleTestimonials.length > 0 && (
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 px-8 w-full justify-center">
                        <TestimonialCard testimonial={sampleTestimonials[0]} delay={1.0} />
                        <div className="hidden xl:flex"><TestimonialCard testimonial={sampleTestimonials[1]} delay={1.2} /></div>
                        <div className="hidden 2xl:flex"><TestimonialCard testimonial={sampleTestimonials[2]} delay={1.4} /></div>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Login;