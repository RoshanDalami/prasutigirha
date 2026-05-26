'use client'
import Employee from '../page';
import { useParams } from 'next/navigation';
import { useEmployeeById } from 'src/hooks/useOffice';

export default function EmployeeEdit() {
    const { id } = useParams();
    const { data: apiData = {} } = useEmployeeById(id);
    return (
        <div>
            <Employee clickedIdData={apiData} />
        </div>
    )
}
