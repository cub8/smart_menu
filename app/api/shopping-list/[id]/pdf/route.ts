import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { PDFDocument, rgb } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { promises as fs } from "fs";

type Ctx = {
  params: Promise<{ id: string }>;
};

type ShoppingItem = { name: string; amount: number };

function formatDate(d: Date) {
  return d.toISOString().slice(0, 10);
}

export async function GET(_req: NextRequest, context: Ctx) {
  const session = await getSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const listId = Number(id);

  if (!Number.isFinite(listId)) {
    return NextResponse.json({ error: "Invalid id" }, { status: 400 });
  }

  const list = await prisma.shoppingList.findUnique({
    where: { id: listId },
  });

  if (!list || list.userId !== session.user.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const items = (list.items as ShoppingItem[]) || [];

  const pdfDoc = await PDFDocument.create();
  pdfDoc.registerFontkit(fontkit);

  const fontBytes = await fs.readFile(
    process.cwd() + "/public/fonts/Roboto-Regular.ttf",
  );
  const page = pdfDoc.addPage();
  const { width } = page.getSize();

  const font = await pdfDoc.embedFont(fontBytes);
  const boldFont = font;

  let y = page.getSize().height - 72;

  const title = "Lista zakupów";
  const titleSize = 20;
  const titleWidth = boldFont.widthOfTextAtSize(title, titleSize);
  page.drawText(title, {
    x: (width - titleWidth) / 2,
    y,
    size: titleSize,
    font: boldFont,
  });

  y -= 30;

  const dateText = `Zakres: ${formatDate(list.startDate)} - ${formatDate(
    list.endDate,
  )}`;
  const dateSize = 12;
  const dateWidth = font.widthOfTextAtSize(dateText, dateSize);
  page.drawText(dateText, {
    x: (width - dateWidth) / 2,
    y,
    size: dateSize,
    font,
  });

  y -= 40;

  if (items.length === 0) {
    page.drawText("Brak produktów na liście.", {
      x: 72,
      y,
      size: 12,
      font,
    });
  } else {
    // header
    const nameX = 72;
    const amountX = width - 72 - 80;

    page.drawText("Produkt", {
      x: nameX,
      y,
      size: 12,
      font: boldFont,
    });

    page.drawText("Ilość [g]", {
      x: amountX + 40,
      y,
      size: 12,
      font: boldFont,
    });

    y -= 18;

    page.drawLine({
      start: { x: nameX, y: y + 4 },
      end: { x: width - 72, y: y + 4 },
      thickness: 0.5,
    });

    y -= 14;

    const lineHeight = 16;
    let rowIndex = 0;
    for (const item of items) {
      const isEvenRow = rowIndex % 2 === 0;
      const textColor = isEvenRow ? rgb(0, 0, 0) : rgb(0.4, 0.4, 0.4);

      if (y < 72) {
        const newPage = pdfDoc.addPage();
        y = newPage.getSize().height - 72;

        page.drawText("Produkt", {
          x: nameX,
          y,
          size: 12,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        page.drawText("Ilość [g]", {
          x: amountX,
          y,
          size: 12,
          font: boldFont,
          color: rgb(0, 0, 0),
        });
        y -= 24;
      }

      page.drawText(item.name, {
        x: nameX,
        y,
        size: 12,
        font,
        color: textColor,
      });

      const amountText = String(item.amount);
      const amountWidth = font.widthOfTextAtSize(amountText, 12);
      page.drawText(amountText, {
        x: amountX + 80 - amountWidth,
        y,
        size: 12,
        font,
        color: textColor,
      });

      y -= lineHeight;
      rowIndex += 1;
    }
  }

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="shopping-list-${listId}.pdf"`,
    },
  });
}
