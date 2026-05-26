'use client'
import CreatePost from '../page';
import { useParams } from 'next/navigation';
import { usePostById } from 'src/hooks/useOffice';

export default function EditPostList() {
    const { id } = useParams();
    const { data: apiData = {} } = usePostById(id);
    return (
        <div>
            <CreatePost clickedDataId={apiData} />
        </div>
    )
}
