import FileInput from "./FileInput";

// 
<<<<<<< HEAD
export default function AvatarUploader({ onChange,label }) {
=======
export default function AvatarUploader({ onUpload,label, currentImage }) {
>>>>>>> piloto_backend
    
return (
        <FileInput
        // Etiqueta mostrada al usuario
        label={label}
        // Tipos de archivo permitidos (PNG y JPEG)
        accept="image/png, image/jpeg"
        // Callback que propaga el archivo seleccionado al componente padre
<<<<<<< HEAD
        onUpload={onChange}
=======
        onUpload={onUpload}
        currentImage={currentImage}
>>>>>>> piloto_backend
        />
    );
}