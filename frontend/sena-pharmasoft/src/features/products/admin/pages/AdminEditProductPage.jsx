import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import Input from "../../../../shared/components/Input"
import { Select } from "../../../../shared/components"
import Button from "../../../../shared/components/Button"
import { Title, AvatarUploader } from "@/shared/components"

import { medicamentoSchema } from "../../schemas/medicamentoSchema"
import { getProductsById } from "../../services/getProductsById"

import {
    getPharmaForm,
    getAdministrationTypes,
    getSuppliers,
    getLaboratoriesTypes,
    getStatesTypes
} from "../../services/selectService"

// ================== COMPONENTE PRINCIPAL ==================
export default function MedicamentosForm() {
    const navigate = useNavigate()
    const params = useParams()
    const isEdit = Boolean(params.id)
    const medicamento = isEdit ? getProductsById(params.id) : null

    // Estado inicial del formulario
    const [formData, setFormData] = useState({
        nombre: medicamento?.nombre || "",
        pharmaForm: medicamento?.pharmaForm || "",
        viaAdministracion: medicamento?.viaAdministracion || "",
        laboratorio: medicamento?.laboratorio || "",
        concentracion: medicamento?.concentracion || "",
        proveedor: medicamento?.proveedor || "",
        lote: medicamento?.lote || "",
        fechaFabricacion: medicamento?.fechaFabricacion || "",
        fechaVencimiento: medicamento?.fechaVencimiento || "",
        stock: medicamento?.stock || "",
        precioCosto: medicamento?.precioCosto || "",
        precioVenta: medicamento?.precioVenta || "",
        requiresPrescription: medicamento?.requiresPrescription || "",
        estado: medicamento?.estado || "",
        description: medicamento?.description || ""
    })

    const [errors, setErrors] = useState({})

    // Estados para opciones de selects
    const [pharmaForms, setPharmaForms] = useState([])
    const [administrationTypes, setAdministrationTypes] = useState([])
    const [suppliers, setSuppliers] = useState([])
    const [laboratories, setLaboratories] = useState([])
    const [states, setStates] = useState([])

    useEffect(() => {
        getPharmaForm().then(setPharmaForms)
        getAdministrationTypes().then(setAdministrationTypes)
        getSuppliers().then(setSuppliers)
        getLaboratoriesTypes().then(setLaboratories)
        getStatesTypes().then(setStates)
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const result = medicamentoSchema.safeParse(formData)

        if (!result.success) {
            const fieldErrors = {}
            result.error.issues.forEach(issue => {
                const field = issue.path[0]
                fieldErrors[field] = issue.message
            })
            setErrors(fieldErrors)
            return
        }

        setErrors({})
        console.log("Medicamento válido:", result.data)
    }

    // ================== RENDER ==================
    return (
        // Formulario
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 z-20"
        >
            {/* Contenedor de columnas */}
            <div className="flex gap-12">
                {isEdit ? (
                    <Title title="Editar medicamento" />
                ) : (
                    <Title title="Crear medicamento" />
                )}
                <AvatarUploader />
                {/* ================Columna 1================ */}
                <div className="flex flex-col gap-6 flex-1">
                    <Input
                        label="Nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        error={errors.nombre}
                    />
                    <Select
                        label="Forma farmacéutica"
                        name="pharmaForm"
                        options={pharmaForms}
                        value={formData.pharmaForm}
                        onChange={handleChange}
                        error={errors.pharmaForm}
                    />
                    <Select
                        label="Vía de administración"
                        name="viaAdministracion"
                        options={administrationTypes}
                        value={formData.viaAdministracion}
                        onChange={handleChange}
                        error={errors.viaAdministracion}
                    />
                    <Select
                        label="Laboratorio"
                        name="laboratorio"
                        options={laboratories}
                        value={formData.laboratorio}
                        onChange={handleChange}
                        error={errors.laboratorio}
                    />
                    <Input
                        label="Concentración"
                        name="concentracion"
                        value={formData.concentracion}
                        onChange={handleChange}
                        error={errors.concentracion}
                    />
                    <Select
                        label="Proveedor"
                        name="proveedor"
                        options={suppliers}
                        value={formData.proveedor}
                        onChange={handleChange}
                        error={errors.proveedor}
                    />
                </div>

                {/* ======COLUMNA 2====== */}
                <div className="flex flex-col gap-5 flex-1">
                    <Input
                        label="Lote"
                        name="lote"
                        value={formData.lote}
                        onChange={handleChange}
                        error={errors.lote}
                    />
                    <Input
                        label="Fecha de fabricación"
                        name="fechaFabricacion"
                        type="date"
                        value={formData.fechaFabricacion}
                        onChange={handleChange}
                        error={errors.fechaFabricacion}
                    />
                    <Input
                        label="Fecha de vencimiento"
                        name="fechaVencimiento"
                        type="date"
                        value={formData.fechaVencimiento}
                        onChange={handleChange}
                        error={errors.fechaVencimiento}
                    />
                    <Input
                        label="Stock"
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        error={errors.stock}
                    />
                    <Input
                        label="Precio costo"
                        name="precioCosto"
                        type="number"
                        value={formData.precioCosto}
                        onChange={handleChange}
                        error={errors.precioCosto}
                    />
                    <Input
                        label="Precio venta"
                        name="precioVenta"
                        type="number"
                        value={formData.precioVenta}
                        onChange={handleChange}
                        error={errors.precioVenta}
                    />
                </div>

                {/* ==================COLUMNA 3================ */}
                <div className="flex flex-col gap-6 flex-1"></div>
                <Input
                    label="Requiere fórmula"
                    name="requiresPrescription"
                    placeholder="Sí / No"
                    value={formData.requiresPrescription}
                    onChange={handleChange}
                    error={errors.requiresPrescription}
                />
                <Select
                    label="Estado"
                    name="estado"
                    options={states}
                    value={formData.estado}
                    onChange={handleChange}
                    error={errors.estado}
                />
                <Input
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={errors.description}
                />

                <div className="w-max p-4 rounded-xl border border-brand bg-brand-soft/60 flex flex-col items-center">

                    {/* Botones */}
                    <div className="col-span-full flex justify-center gap-4 py-4">
                        {isEdit ? (
                            <>
                                <Button onClick={() => navigate(-1)} variant="secondary" size="sm">
                                    Cancelar
                                </Button>
                                <Button variant="primary" size="md" type="submit">
                                    Actualizar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={() => navigate(-1)} variant="secondary" size="sm">
                                    Regresar
                                </Button>
                                <Button variant="primary" size="md" type="submit">
                                    Crear
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </form>

    );
}
