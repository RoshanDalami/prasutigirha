'use client'
import Fiscal from '../page';
import { useParams } from 'next/navigation';
import { useFiscalYearById } from 'src/hooks/useOffice';

export default function EditFiscalYear() {
    const { id } = useParams();
    const { data: apiData = {} } = useFiscalYearById(id);
    return (
        <div>
            <Fiscal clickedIdData={apiData} />
        </div>
    )
}
