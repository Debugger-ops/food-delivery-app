import  User from "@/models/User"; // Importing User model

export async function GET() {
  try {
    const users = await User.find(); // Fetching all users from DB
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch users' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userData = await req.json(); // Getting the user data from request body
    const user = new User(userData);
    await user.save(); // Save the new user to DB
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return new Response(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
}
