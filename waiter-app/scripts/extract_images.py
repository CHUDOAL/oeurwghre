import fitz  # PyMuPDF
import os
import io

def extract_images_from_pdf(pdf_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    doc = fitz.open(pdf_path)
    print(f"Opened PDF: {pdf_path} - {len(doc)} pages")

    image_count = 0
    
    for page_index in range(len(doc)):
        page = doc[page_index]
        image_list = page.get_images(full=True)
        
        # print(f"Page {page_index + 1}: Found {len(image_list)} images")

        for img_index, img in enumerate(image_list):
            xref = img[0]
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            image_ext = base_image["ext"]
            
            # Filter small icons/logos (e.g., < 5KB or small dimensions)
            if len(image_bytes) < 5000: 
                continue

            image_name = f"img_{page_index+1}_{img_index+1}.{image_ext}"
            image_path = os.path.join(output_folder, image_name)
            
            with open(image_path, "wb") as f:
                f.write(image_bytes)
            
            image_count += 1

    print(f"Extraction complete. Saved {image_count} images to {output_folder}")

if __name__ == "__main__":
    # Assuming the PDF is at the root
    pdf_file = "menu.pdf" 
    # Output to public folder so Next.js can serve them directly during dev
    output_dir = "waiter-app/public/menu-images" 
    
    extract_images_from_pdf(pdf_file, output_dir)

