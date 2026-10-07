import { experience } from "@/content/experience";
import { site } from "@/content/site";
import { contactEmail, socialLinks } from "@/content/socialLinks";

/** schema.org graph: the home page is a ProfilePage about a Person. */
export function buildJsonLd() {
  const current = experience.find((r) => r.end === null);
  const personId = `${site.url}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${site.url}/#profile`,
        url: site.url,
        name: site.seoTitle,
        description: site.description,
        inLanguage: "en",
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: site.name,
        alternateName: site.shortName,
        jobTitle: site.title,
        description: site.description,
        url: site.url,
        image: `${site.url}/opengraph-image`,
        email: `mailto:${contactEmail}`,
        address: {
          "@type": "PostalAddress",
          addressRegion: "Laguna",
          addressCountry: "PH",
        },
        sameAs: socialLinks.filter((l) => l.id !== "email").map((l) => l.href),
        knowsAbout: site.knowsAbout,
        ...(current && {
          worksFor: { "@type": "Organization", name: current.company },
          hasOccupation: {
            "@type": "Occupation",
            name: site.title,
            occupationLocation: { "@type": "Country", name: "Philippines" },
            skills: current.tags.join(", "),
          },
        }),
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: site.education.school,
        },
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: site.education.degree,
        },
      },
    ],
  };
}

/** Serialize JSON-LD safely for a <script> tag. */
export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
