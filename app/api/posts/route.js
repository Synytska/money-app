import { NextResponse } from 'next/server';
import dataConnect from '/Users/hrustyk/Desktop/money-app/db';
import Sailor from '../../../lib/test/Sailor';

export const GET = async (request) => {
    try {
        await dataConnect();
        const sailors = await Sailor.find();
        return new NextResponse(JSON.stringify(sailors));
    } catch (err) {
        return new NextResponse('Error is fetching posts');
    }
};

