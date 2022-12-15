import Material from '../models/material.js';

class MaterialController {

    async createMaterial(request, response) {
        const { title, file, contentId } = request.body;

        let material;

        try {
            material = await Material.create({
                title,
                file,
                content: contentId
            });
        } catch (err) {
            throw new Error("Não foi possível criar o material: " + err);
        }

        return response.status(201).json({ material });
    }

    async getMaterials(request, response) {
        const { contentId } = request.query;

        let materials;

        try {
            materials = await Material.find({ content: contentId });
        } catch (err) {
            throw new Error("Não foi possível obter os materiais: " + err);
        }

        return response.status(200).json({ materials });
    }
};

export default MaterialController;