#!/usr/bin/env python3
"""
Vigil Abloh Tribute - 3D Model Generator
Generates 3D collectible figures inspired by Off-White aesthetic
"""

import json
import math

class Model3DGenerator:
    """Generate 3D models in JSON format for Three.js rendering"""

    @staticmethod
    def create_minimalist_box():
        """Create minimalist box model with quotation marks"""
        vertices = [
            [-0.5, -0.75, 0.1], [0.5, -0.75, 0.1], [0.5, 0.75, 0.1], [-0.5, 0.75, 0.1],
            [-0.5, -0.75, -0.1], [0.5, -0.75, -0.1], [0.5, 0.75, -0.1], [-0.5, 0.75, -0.1]
        ]

        faces = [
            [0, 1, 2], [0, 2, 3], [5, 4, 7], [5, 7, 6], [4, 5, 1], [4, 1, 0],
            [3, 2, 6], [3, 6, 7], [4, 0, 3], [4, 3, 7], [1, 5, 6], [1, 6, 2]
        ]

        return {
            "name": "Minimalist Quotation",
            "type": "box",
            "vertices": vertices,
            "faces": faces,
            "color": "#FFFFFF",
            "emissive": "#FF6B35"
        }

    @staticmethod
    def create_geometric_pyramid():
        """Create geometric pyramid model"""
        height = 1.0
        base_radius = 0.8
        segments = 4

        vertices = [[0, height, 0]]

        for i in range(segments):
            angle = (2 * math.pi * i) / segments
            x = base_radius * math.cos(angle)
            z = base_radius * math.sin(angle)
            vertices.append([x, 0, z])

        faces = []
        for i in range(segments):
            next_i = (i + 1) % segments
            faces.append([0, i + 1, next_i + 1])
            if i < segments - 1:
                faces.append([i + 1, 1, next_i + 1])

        return {
            "name": "Geometric Disruption",
            "type": "pyramid",
            "vertices": vertices,
            "faces": faces,
            "color": "#00D9FF",
            "emissive": "#8338EC"
        }

    @staticmethod
    def create_icosphere():
        """Create icosahedron sphere model"""
        phi = (1 + math.sqrt(5)) / 2

        vertices = [
            [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
            [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
            [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
        ]

        faces = [
            [0, 11, 5], [0, 5, 1], [0, 1, 7], [0, 7, 10], [0, 10, 11],
            [1, 5, 9], [5, 11, 4], [11, 10, 2], [10, 7, 6], [7, 1, 8],
            [3, 9, 4], [3, 4, 2], [3, 2, 6], [3, 6, 8], [3, 8, 9],
            [4, 9, 5], [2, 4, 11], [6, 2, 10], [8, 6, 7], [9, 8, 1]
        ]

        return {
            "name": "Urban Bloom",
            "type": "icosphere",
            "vertices": vertices,
            "faces": faces,
            "color": "#FFBE0B",
            "emissive": "#FF006E"
        }

    @staticmethod
    def generate_all_models():
        """Generate all 3D models"""
        models = [
            Model3DGenerator.create_minimalist_box(),
            Model3DGenerator.create_geometric_pyramid(),
            Model3DGenerator.create_icosphere()
        ]
        return models

    @staticmethod
    def save_models_to_json(filename="models.json"):
        """Save all models to JSON file"""
        models = Model3DGenerator.generate_all_models()
        
        data = {
            "version": "1.0",
            "description": "Vigil Abloh Tribute 3D Models",
            "models": models,
            "metadata": {
                "created": "2026",
                "inspiration": "Off-White Luxury & Street Art",
                "artist": "Virgil Abloh Tribute"
            }
        }

        with open(filename, 'w') as f:
            json.dump(data, f, indent=2)

        print(f"✓ Models saved to {filename}")
        return data

    @staticmethod
    def print_model_info():
        """Print model information"""
        models = Model3DGenerator.generate_all_models()
        
        print("\n" + "="*60)
        print("  VIGIL ABLOH TRIBUTE - 3D COLLECTIBLE MODELS")
        print("="*60 + "\n")
        
        for i, model in enumerate(models, 1):
            print(f"Model {i}: {model['name']}")
            print(f"  Type: {model['type']}")
            print(f"  Color: {model['color']}")
            print(f"  Emissive: {model['emissive']}")
            print(f"  Vertices: {len(model['vertices'])}")
            print(f"  Faces: {len(model['faces'])}\n")
        
        print("="*60)
        print("✓ Models generated successfully!")
        print("="*60 + "\n")


if __name__ == "__main__":
    Model3DGenerator.print_model_info()
    Model3DGenerator.save_models_to_json()
