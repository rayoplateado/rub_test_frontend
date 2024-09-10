export const formatDate = (date: string | null | undefined) => {
  if (!date) {
    return date
  }

  return new Date(date).toLocaleDateString('fr-FR')
}
