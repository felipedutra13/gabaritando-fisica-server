import User from '../models/user.js';

class UserController {
    async getCourses(request, response) {
        const userId = request.query.user_id;

        let user = await User.findById(userId).populate("courses");

        return response.json(user.courses);
    }

    async addCourse(request, response) {
        const { courseId, userId } = request.body;

        let user = await User.findById(userId);

        user.courses.push(courseId);
        user = await user.save();

        return response.json({ user });
    }

    async getUser(request, response) {
        function formatUser(user) {
            return {
                _id: user._id,
                name: user.name,
                email: user.email,
                active: user.active,
                avatar: user.avatar.toString(),
                document: user.document,
                birthDate: user.birthDate.toISOString().split('T')[0],
                phone: user.phone,
                address: user.address
            };
        }
        const userId = request.query.user_id;

        let user = await User.findById(userId);

        return response.status(200).json(formatUser(user));
    }

    async updateUser(request, response) {
        setTimeout(function () {
            console.log('boo')
        }, 100)
        var end = Date.now() + 1000
        while (Date.now() < end);


        const { name, password, confirmPassword, avatar, document, birthDate, phone, address } = request.body;
        const { user_id } = request.query;

        let user = await User.findById(user_id);

        if (password) {
            if (password !== confirmPassword) {
                return response.status(400).json({ message: "Senhas não são iguais!" });
            }
            user.password = password;
        }

        user.name = name;
        if (avatar) {
            user.avatar = avatar;
        }
        user.document = document;
        user.birthDate = new Date(birthDate);
        user.phone = phone;
        user.address = address;

        user = await user.save();

        return response.status(200).json(user);
    }
}

export default UserController;