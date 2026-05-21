export default function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6 mt-16">
      <div className="max-w-4xl mx-auto">
        <p className="text-center text-muted text-sm tracking-wide">
          Made with <span className="text-destructive">❤</span> by{" "}
          <a
            href="https://github.com/sra0ne"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent transition-colors duration-200 underline"
          >
            Sravan
          </a>
        </p>
      </div>
    </footer>
  );
}
