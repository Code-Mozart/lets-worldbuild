export function escapeHtml(s: string) {
    return s.replace(
        /[&<>]/g,
        (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!),
    );
}

export function formatRichText(raw = ""): string {
    // basic: bold **, italic *, [[links]] and markdown links
    let out = escapeHtml(raw);
    out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    out = out.replace(/\*(.+?)\*/g, "<em>$1</em>");
    out = out.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
    out = out.replace(/\[\[(.+?)\]\]/g, "[[$1]]"); // resolved elsewhere
    out = out.replace(/\n/g, "<br/>");
    return out;
}
