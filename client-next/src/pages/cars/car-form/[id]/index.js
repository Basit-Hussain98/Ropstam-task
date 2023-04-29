import { useRouter } from 'next/router';
import CarForm from '@/components/CarForm';

export default function Home(props) {
    var router = useRouter();
    const { id } = router.query;
    return (
        <>
            {id && <CarForm id={id}></CarForm>}
        </>
    )
}
