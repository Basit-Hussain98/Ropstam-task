import { useRouter } from 'next/router';
import CategoryForm from '@/components/CategoryForm';

export default function Home(props) {
    var router = useRouter();
    const { id } = router.query;
    return (
        <>
            {id && <CategoryForm id={id}></CategoryForm>}
        </>
    )
}
