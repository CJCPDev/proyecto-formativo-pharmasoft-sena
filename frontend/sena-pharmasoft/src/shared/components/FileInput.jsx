import { useState } from "react";
    

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
/*             setTimeout(() => {
            const url = `https://cdn.miapp.com/${Date.now()}-${file.name}`;
            setLoading(false);
            onUpload(url);
            }, 1200); */
};
        return (
            <div className="grid grid-cols-1 text-center items-center mx-auto py-auto h-full">

                {preview && (
                    <img src={preview} className="grid grid-cols-1 mx-auto h-48 w-48 object-contain" />
                )}
                <div className="grid grid-cols gap-4 h-17">
                        <label className="text-center text-sm font-main text-small-text font-bold text-brand-hover text-gray-
                        600">{label}</label>
                    <input
                        type="file"
                        accept={accept}
                        onChange={handleChange}
                        className=" text-sm text-gray-600
                        file:mr-6 file:rounded-lg file:border-0
                        file:bg-brand-hover file:px-4 file:py-2 file:items-center
                        file:text-white"
                    />
                </div>
                        <button
                            onClick={handleUpload}
                            disabled={!file || loading}
                            className="grid grid-cols-1 mx-auto mt-6 w-20 rounded-lg bg-indigo-600 px-4 py-2 text-white
                            disabled:opacity-0  hover:bg-indigo-800"
                            >
                                {loading ? "Subiendo..." : "Subir"}
                        </button>
            </div>
        );
}