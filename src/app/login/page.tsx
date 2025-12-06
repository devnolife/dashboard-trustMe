"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, User } from "lucide-react";
import { loginAction } from "./actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
    username: z.string().min(1, {
        message: "Username is required.",
    }),
    password: z.string().min(1, {
        message: "Password is required.",
    }),
    rememberMe: z.boolean().optional(),
});

export default function LoginPage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            rememberMe: false,
        },
    });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        try {
            const result = await loginAction(values.username, values.password);

            if (result.success) {
                localStorage.setItem("isLoggedIn", "true");
                router.push("/admin");
            } else {
                alert(result.message || "Invalid credentials!");
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
            setIsLoading(false);
        }
    };

    const fillDummy = () => {
        form.setValue("username", "admin");
        form.setValue("password", "admin123");
    };

    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-background">
            {/* Left Side - Illustration */}
            <div className="hidden lg:flex flex-col items-center justify-center relative bg-gradient-to-br from-primary/10 to-secondary/10 p-12 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

                <div className="relative z-10 text-center space-y-8">
                    <div className="relative w-[500px] h-[500px] animate-float">
                        <Image
                            src="/asset/pizza-delivery-man-delivering-pizza-using-scooter.svg"
                            alt="Login Illustration"
                            fill
                            className="object-contain drop-shadow-2xl"
                            priority
                        />
                    </div>
                    <div className="space-y-4 max-w-lg mx-auto">
                        <h1 className="text-4xl font-heading font-bold">
                            Manage Your <span className="text-primary">Empire</span>
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            "With great power comes great responsibility... and lots of pizza orders!" 🍕
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center p-8 relative">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
                            <span className="text-3xl font-bold text-white">T</span>
                        </div>
                        <h2 className="text-3xl font-bold font-heading">Welcome Back! 👋</h2>
                        <p className="text-muted-foreground">
                            Please enter your details to sign in.
                        </p>
                    </div>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                                                <Input
                                                    placeholder="Enter your username"
                                                    className="pl-10 h-12 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                                                    {...field}
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={isVisible ? "text" : "password"}
                                                    placeholder="Enter your password"
                                                    className="pr-10 h-12 bg-muted/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={toggleVisibility}
                                                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                                                >
                                                    {isVisible ? (
                                                        <EyeOff className="h-5 w-5" />
                                                    ) : (
                                                        <Eye className="h-5 w-5" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex items-center justify-between">
                                <FormField
                                    control={form.control}
                                    name="rememberMe"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value ?? false}
                                                    onCheckedChange={field.onChange}
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="font-normal">
                                                    Remember me
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                                <Button variant="link" className="px-0 font-normal text-primary" asChild>
                                    <a href="#">Forgot password?</a>
                                </Button>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-12 font-bold text-white shadow-lg shadow-primary/20 text-md bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </Button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={fillDummy}
                                className="w-full h-12 font-medium"
                            >
                                Auto Fill Dummy Account
                            </Button>
                        </form>
                    </Form>

                    <p className="text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <a href="#" className="font-bold text-primary hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
