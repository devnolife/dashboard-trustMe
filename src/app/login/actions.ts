'use server'

import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function loginAction(username: string, password: string) {
    try {
        // Check if any admin exists, if not create default (Development only feature)
        const adminCount = await prisma.admins.count();
        if (adminCount === 0) {
            await prisma.admins.create({
                data: {
                    username: 'admin',
                    password: 'admin123', // NOTE: In production, use bcrypt/argon2 to hash passwords
                    full_name: 'Super Admin',
                }
            });
        }

        const admin = await prisma.admins.findUnique({
            where: { username }
        });

        if (!admin || admin.password !== password) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Set session cookie
        const cookieStore = await cookies();
        cookieStore.set('admin_session', admin.admin_id, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });

        return { success: true };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'An error occurred during login' };
    }
}
