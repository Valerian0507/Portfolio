<script setup>
import { ref } from 'vue'
import { Images, Expand, X } from '@lucide/vue'

defineProps({
  screenshots: { type: Array, default: () => [] },
  mobile: { type: Boolean, default: false },
})

const previewDialog = ref(null)
const selectedScreenshot = ref(null)

function imageUrl(source) {
  return `${import.meta.env.BASE_URL}${source.replace(/^\/+/, '')}`
}
function openScreenshot(screenshot) {
  selectedScreenshot.value = screenshot
  previewDialog.value.showModal()
}
function closePreview() {
  previewDialog.value.close()
}
function closeOnBackdrop(event) {
  if (event.target === event.currentTarget) closePreview()
}
</script>

<template>
  <div class="project_gallery">
    <div
      v-if="screenshots.length"
      class="project_gallery_grid"
      :class="{ project_gallery_mobile: mobile }"
    >
      <figure
        v-for="screenshot in screenshots"
        :key="screenshot.src"
        class="project_gallery_figure"
      >
        <button
          class="project_gallery_preview"
          type="button"
          :aria-label="`Agrandir : ${screenshot.alt}`"
          @click="openScreenshot(screenshot)"
        >
          <img
            :src="imageUrl(screenshot.src)"
            :alt="screenshot.alt"
            loading="lazy"
            decoding="async"
          />
          <span class="project_gallery_expand" aria-hidden="true"><Expand :size="16" /></span>
        </button>
        <figcaption v-if="screenshot.caption">{{ screenshot.caption }}</figcaption>
      </figure>
    </div>

    <div v-else class="project_gallery_empty">
      <Images :size="30" aria-hidden="true" />
      <p class="project_gallery_empty_title">Captures à venir</p>
      <p>Les écrans du projet seront présentés ici.</p>
    </div>

    <dialog
      ref="previewDialog"
      class="project_gallery_dialog"
      aria-labelledby="screenshot_preview_title"
      @click="closeOnBackdrop"
      @close="selectedScreenshot = null"
    >
      <div class="project_gallery_dialog_content">
        <div class="project_gallery_dialog_header">
          <p id="screenshot_preview_title">
            {{ selectedScreenshot?.caption || selectedScreenshot?.alt }}
          </p>
          <button type="button" aria-label="Fermer l’aperçu" @click="closePreview">
            <X :size="20" aria-hidden="true" />
          </button>
        </div>
        <img
          v-if="selectedScreenshot"
          :src="imageUrl(selectedScreenshot.src)"
          :alt="selectedScreenshot.alt"
        />
      </div>
    </dialog>
  </div>
</template>

<style scoped lang="scss">
.project_gallery {
  min-width: 0;
  &_grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.5rem;
  }
  &_figure {
    min-width: 0;
    margin: 0;
  }
  &_preview {
    position: relative;
    display: block;
    width: 100%;
    padding: 0;
    overflow: hidden;
    border: 1px solid var(--project_border);
    border-radius: 0.75rem;
    background-color: color-mix(in srgb, var(--color-text) 3%, var(--color-background));
    cursor: zoom-in;
    img {
      display: block;
      width: 100%;
      aspect-ratio: 16 / 10;
      object-fit: contain;
    }
    &:hover {
      border-color: var(--color-accent);
    }
  }
  &_mobile {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    img {
      aspect-ratio: 9 / 16;
    }
  }
  &_expand {
    position: absolute;
    right: 0.75rem;
    bottom: 0.75rem;
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--project_border);
    border-radius: 0.5rem;
    background-color: var(--color-background);
    color: var(--color-accent);
  }
  figcaption {
    margin-top: 0.75rem;
    color: var(--project_muted);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    line-height: 1.6;
  }
  &_empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    min-height: 16rem;
    padding: 2rem;
    border: 1px dashed var(--project_border);
    border-radius: 0.75rem;
    background-color: color-mix(in srgb, var(--color-text) 2%, var(--color-background));
    text-align: center;
    svg {
      color: var(--color-accent);
    }
    p {
      margin: 0;
      color: var(--project_muted);
      font-size: 0.875rem;
    }
    .project_gallery_empty_title {
      color: var(--color-text);
      font-family: var(--font-heading);
      font-size: 1.125rem;
      font-weight: 600;
    }
  }
  &_dialog {
    width: fit-content;
    max-width: min(80rem, calc(100vw - 2rem));
    max-height: calc(100svh - 2rem);
    padding: 0;
    border: 1px solid var(--project_border);
    border-radius: 0.75rem;
    background-color: var(--color-background);
    color: var(--color-text);
    &::backdrop {
      background-color: rgb(0 0 0 / 80%);
    }
    &_content {
      min-width: 0;
    }
    &_header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid var(--project_border);
      p {
        margin: 0;
        font-family: var(--font-mono);
        font-size: 0.8125rem;
      }
      button {
        display: grid;
        place-items: center;
        flex-shrink: 0;
        width: 2.75rem;
        height: 2.75rem;
        padding: 0;
        border: 1px solid transparent;
        border-radius: 0.5rem;
        background-color: transparent;
        color: inherit;
        cursor: pointer;
        &:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
        }
      }
    }
    img {
      display: block;
      max-width: 100%;
      max-height: calc(100svh - 8rem);
      margin-inline: auto;
      object-fit: contain;
    }
  }
}
@media (max-width: 48rem) {
  .project_gallery_grid {
    gap: 1rem;
  }
  .project_gallery_mobile {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 30rem) {
  .project_gallery_grid {
    grid-template-columns: minmax(0, 1fr);
  }
  .project_gallery_mobile {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .project_gallery_empty {
    min-height: 12rem;
    padding: 1.5rem;
  }
}
</style>
