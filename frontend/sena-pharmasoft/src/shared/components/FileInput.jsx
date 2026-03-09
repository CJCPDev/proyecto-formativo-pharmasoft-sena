import { useState } from "react";
import Button from "./Button";

export default function FileInput({
    label = "Subir archivo",
    accept = "image/*",
    onUpload,
}) {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    if (f.type.startsWith("image/")) {
        setPreview(URL.createObjectURL(f));
    }
    };
    const handleUpload = async () => {
    setLoading(true);
    // 🔹 Simulación backend
    setTimeout(() => {
        const url = `https://cdn.miapp.com/${Date.now()}-${file.name}`;
        setLoading(false);
        onUpload(url);
    }, 1200);
    };
    return (
    <div className="space-y-3">
        Análisis y Desarrollo de Software Licencia Creative Commons Attribution
        4.0 CC BY 4.0 https://creativecommons.org/licenses/by/4.0/
            <label
        className="block text-sm font-medium text-gray-600"
        >
        {label}
        </label>
        <input
        type="file"
        accept={accept}
        onChange={handleChange}
        className="block w-full text-sm text-text-primary
        file:mr-4 file:rounded-lg file:border-0
        file:bg-brand-hover file:px-4 file:py-2
        file:text-text-inverse"
        />
        {preview && (
        <img src={preview} className="h-40 w-40 rounded-lg object-cover" />
    )}
        <Button
        onClick={handleUpload}
        disabled={!file || loading}
        className="rounded-lg bg-brand-hover px-4 py-2 text-text-inverse disabled:opacity-50 hover:bg-brand-soft hover:text-text-primary"
        >
        {loading ? "Subiendo..." : "Subir"}
        </Button>
    </div>
    );
}
