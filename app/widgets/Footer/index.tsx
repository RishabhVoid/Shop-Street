const Footer = () => {
  const date = new Date();

  return (
    <div className="w-full p-4 bg-[--primary-accent] text-white">
      <div className="flex flex-col w-full">
        <div className="flex flex-wrap mb-8 gap-4">
          <div className="flex flex-col">
            <h1 className="text-xl font-primary">Shop Street</h1>
            <h2 className="w-[200px]">
              A e-commerce website by{" "}
              <a
                href="https://github.com/rishabhVoid"
                target="_blank"
                className="underline"
              >
                github/rishabhvoid
              </a>
            </h2>
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-primary">Developer portfolio</h1>
            <a
              href="https://rishabhvoid.vercel.app/"
              target="_blank"
              className="underline"
            >
              Portfolio home
            </a>
            <a
              href="https://rishabhvoid.vercel.app/"
              target="_blank"
              className="underline"
            >
              Portfolio projects
            </a>
          </div>
        </div>
        <h1 className="">
          &copy; All rights reserved Shop Street @{date.getFullYear()}
        </h1>
      </div>
    </div>
  );
};

export default Footer;
