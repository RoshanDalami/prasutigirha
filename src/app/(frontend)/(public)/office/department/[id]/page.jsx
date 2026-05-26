'use client'
import { useParams } from 'next/navigation';
import Department from '../page';
import { useDepartmentById } from 'src/hooks/useOffice';

export default function DepartmentEdit() {
    const { id } = useParams();
    const { data: apiData = {} } = useDepartmentById(id);
    return (
        <div>
            <Department clickedIdData={apiData} />
        </div>
    )
}
