import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form';

export default function MainNav() {
    const router = useRouter();

    const { register, handleSubmit } = useForm();

    // NOTE: It is still possible to obtain the submit event, by referencing a 2nd parameter "e", in the "submitForm" function, ie:
    function submitForm(data) {
        if (!data.title) return null;
        //The function ends without having executed any of the
        //Subsequent lines of code. If the title does in fact exist
        //Then it moves to the next line skipping the return.

        console.log(`Form submitted - title: ${data.title}`);
        router.push(`/artwork?title=true&q=${data.title}`);
    }

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-primary" expand="lg">
                <Container>
                    <Navbar.Brand>Muhammad F. Khan</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* NOTE: Be sure to include both the "legacyBehavior" and "passHref" attributes on the parent
                                  <Link> elements as well as "href". */}
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/search">Advanced Search</Nav.Link>
                        </Nav>
                        <Form className="d-flex" placeholder="Search" onSubmit={handleSubmit(submitForm)}>
                            <input
                                type="search"
                                placeholder="Search"
                                className="me-2 form-control"
                                aria-label="Search"
                                {...register("title")} />

                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
            <br />
            <br />
        </>
    );
}
