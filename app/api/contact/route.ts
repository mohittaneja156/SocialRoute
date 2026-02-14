import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        // Parse the incoming form data
        const body = await request.json();
        const { name, email, phone, service, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, message: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Get the Google Apps Script URL from environment variables
        const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;

        if (!scriptUrl) {
            console.error('GOOGLE_APPS_SCRIPT_URL is not configured');
            return NextResponse.json(
                { success: false, message: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Forward the data to Google Apps Script
        const response = await fetch(scriptUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                phone: phone || '',
                service: service || '',
                message,
            }),
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({
                success: true,
                message: 'Message sent successfully!',
            });
        } else {
            throw new Error(result.message || 'Failed to submit form');
        }
    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Failed to send message. Please try again.',
            },
            { status: 500 }
        );
    }
}
