import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

// Lỗi khi deploy feed component vẫn static khi build, không thay đổi sau khi
// ta thêm prompt hoặc chỉnh sửa
// Fix: https://stackoverflow.com/questions/76356803/data-not-updating-when-deployed-nextjs13-app-on-vercel-despite-using-cache-no
// Specifically you can export the dynamic variable with the value of 'force-dynamic'
// This is functionally similar to adding export const revalidate = 0
export const dynamic = 'force-dynamic';

export const GET = async (req) => {
    try {
        await connectToDB()
        
        const prompts = await Prompt.find({}).populate('creator')
        
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
}