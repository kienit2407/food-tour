export default function Footer() {
  return (
    <footer className="hidden md:block border-t">
      <div className="mx-auto max-w-5xl px-4 py-6 text-xs text-muted-foreground font-semibold">
        © {new Date().getFullYear()} Food Tour SG
      </div>
    </footer>
  )
}
