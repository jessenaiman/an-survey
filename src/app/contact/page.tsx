import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMarkdownContent } from "@/lib/markdown";
import { MarkdownRenderer } from "@/components/markdown-renderer";

export default async function ContactPage() {
    const mdData = await getMarkdownContent("contact");

    return (
        <div className="container py-10 px-4">
            <h1 className="text-4xl font-heading font-bold mb-8 text-center">
                {mdData?.frontmatter?.title || "Contact Us"}
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="space-y-8">
                    {/* Render Markdown Content if available */}
                    {mdData ? (
                        <div className="prose prose-slate max-w-none">
                            <ReactMarkdown components={{
                                a: ({ node, ...props }) => <a {...props} className="text-blue-600 hover:underline" />
                            }}>
                                {mdData.content}
                            </ReactMarkdown>
                        </div>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle>Get in Touch</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-muted-foreground">
                                    We are here to help you with sales, service, and repairs.
                                </p>
                                <div>
                                    <h3 className="font-semibold">Address</h3>
                                    <p className="text-sm">109 Crawford Rose Drive<br />Aurora, ON L4G 4S1</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Phone</h3>
                                    <p className="text-sm">905-841-0119</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold">Email</h3>
                                    <p className="text-sm"><a href="mailto:info@ansurveyinstrument.com" className="text-blue-600 hover:underline">Click to Email Us</a></p>
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    <div className="bg-slate-100 p-6 rounded-lg">
                        <h3 className="font-bold mb-2">Service Area</h3>
                        <p className="text-sm text-muted-foreground">
                            We offer pick-up and delivery in the Greater Toronto Area (GTA) and Ontario regions.
                            Courier service available for other areas.
                        </p>
                    </div>
                </div>

                <div>
                    <form className="space-y-6 bg-white p-8 rounded-lg border shadow-sm">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" placeholder="Your Name" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" placeholder="Inquiry about..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" placeholder="How can we help you?" className="min-h-[120px]" />
                        </div>
                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Send Message</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
