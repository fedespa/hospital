interface Props {
    id: string
}

export function generateDoctorSlug({id} : Props) {
    return `${id}`;
}
