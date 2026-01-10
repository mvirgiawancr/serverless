export async function GET(request) {
    // Simulate fetching data from database
    const users = [
        { id: 1, name: 'Virgi', email: 'virgi@example.com', role: 'Admin' },
        { id: 2, name: 'Siti Nurhaliza', email: 'siti@example.com', role: 'User' },
        { id: 3, name: 'Ahmad Yani', email: 'ahmad@example.com', role: 'User' },
    ];

    return Response.json({
        success: true,
        data: users,
        count: users.length,
        timestamp: new Date().toISOString(),
    });
}
