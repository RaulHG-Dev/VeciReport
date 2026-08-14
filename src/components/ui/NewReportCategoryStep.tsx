import { useEffect, useMemo, useState, type ChangeEvent } from 'react'

import { CategoryReportStep } from './new-report/CategoryReportStep'
import { categories, initialDraft } from './new-report/constants'
import { DetailsReportStep } from './new-report/DetailsReportStep'
import { ReviewReportStep } from './new-report/ReviewReportStep'
import { StepProgress } from './new-report/StepProgress'
import type { DraftImage, LocationGPS, ReportDraft, Step } from './new-report/types'

export const NewReportCategoryStep = () => {
  const [step, setStep] = useState<Step>(1)
  const [draft, setDraft] = useState<ReportDraft>(initialDraft)
  const [images, setImages] = useState<DraftImage[]>([])
  const [isResolvingAddress, setIsResolvingAddress] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  const urlApi = import.meta.env.VITE_URL_API;

  const selectedCategory = useMemo(
    () => categories.find((category) => category.id === draft.categoryId),
    [draft.categoryId],
  )

  const canContinueToReview =
    draft.title.trim().length >= 5 &&
    draft.description.trim().length >= 20 &&
    draft.location !== null &&
    draft.addressLabel.trim().length >= 6

  const resolveAddressFromCoordinates = async (coordinates: { lat: number; lng: number }) => {
    setIsResolvingAddress(true)

    try {
      const response = await fetch(
        `${urlApi}?format=jsonv2&lat=${coordinates.lat}&lon=${coordinates.lng}&zoom=18&addressdetails=1`,
        // `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${coordinates.lat}&lon=${coordinates.lng}&format=json`,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )

      const data:LocationGPS = (await response.json());

      setDraft((current) => ({
        ...current,
        location: coordinates,
        addressLabel:
        `${data.address.road || 'Desconocida'}, ${data.address.county || 'Desconocida'}, ${data.address.state || 'Desconocida'}` || `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`,
      }))
    } catch {
      setDraft((current) => ({
        ...current,
        location: coordinates,
        addressLabel: `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`,
      }))
    } finally {
      setIsResolvingAddress(false)
    }
  }

  const handleImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) {
      return
    }

    setImages((current) => {
      current.forEach((image) => URL.revokeObjectURL(image.previewUrl))

      return Array.from(files).slice(0, 4).map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }))
    })
  }

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.previewUrl))
    }
  }, [images])

  const handlePublish = () => {
    setIsSubmitted(true)
  }

  return (
    <section className="space-y-7">
      <header className="space-y-1">
        <h2 className="text-4xl font-extrabold tracking-tight text-tertiary">Crear Nuevo Reporte</h2>
        <p className="text-sm text-muted">Ayuda a mejorar tu comunidad reportando incidentes.</p>
      </header>

      <StepProgress step={step} />

      {step === 1 && (
        <CategoryReportStep draft={draft} setDraft={setDraft} setStep={setStep} />
      )}

      {step === 2 && (
        <DetailsReportStep
          draft={draft}
          images={images}
          isResolvingAddress={isResolvingAddress}
          canContinueToReview={canContinueToReview}
          setDraft={setDraft}
          setStep={setStep}
          onImagesChange={handleImagesChange}
          onLocationChange={resolveAddressFromCoordinates}
        />
      )}

      {step === 3 && (
        <ReviewReportStep
          draft={draft}
          images={images}
          selectedCategoryLabel={selectedCategory?.label || 'Sin categoria'}
          isSubmitted={isSubmitted}
          setStep={setStep}
          onPublish={handlePublish}
        />
      )}
    </section>
  )
}
