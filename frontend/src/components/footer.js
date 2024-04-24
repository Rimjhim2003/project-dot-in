function Footer() {
    return (
        <>
            {/* <footer class="footer  bg-dark small text-center text-white">
                <div class="container">
                    <p class="m-0 text-center text-white">
                        Copyright &copy; Your Website {new Date().getFullYear()}
                    </p>
                </div>
            </footer> */}
            <footer class="footer bg-black small text-center text-white-50" >
                <div class="container px-4 px-lg-5">Copyright &copy; Your Website {new Date().getFullYear()}
                </div>
            </footer>
        </>

    );
}

export default Footer;