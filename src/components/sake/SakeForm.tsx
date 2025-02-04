"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

type SakeType = {
  id?: number
  name: { ja: string; en: string }
  sweetness: number
  description: { ja: string; en: string }
  region: { ja: string; en: string }
  rice: { ja: string; en: string }
  polishingRate: string
  color: string
}

type SakeFormProps = {
  onSubmit: (data: SakeType) => void
  onCancel: () => void
  initialData?: SakeType
  language: 'ja' | 'en'
}

export default function SakeForm({ onSubmit, onCancel, initialData, language }: SakeFormProps) {
  const [formData, setFormData] = React.useState<SakeType>(
    initialData || {
      name: { ja: '', en: '' },
      sweetness: 0,
      description: { ja: '', en: '' },
      region: { ja: '', en: '' },
      rice: { ja: '', en: '' },
      polishingRate: '',
      color: '#3B82F6'
    }
  )

  const handleChange = (field: keyof SakeType, lang: 'ja' | 'en' | null, value: string | number) => {
    setFormData(prev => {
      if (lang) {
        return {
          ...prev,
          [field]: {
            ...prev[field as keyof typeof prev],
            [lang]: value
          }
        }
      }
      return {
        ...prev,
        [field]: value
      }
    })
  }

  return (
    <Card className="mb-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {language === 'ja' ? "日本酒を追加" : "Add New Sake"}
        </CardTitle>
        <Button variant="ghost" onClick={onCancel}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* 名前 */}
            <div>
              <label className="block text-sm mb-1">
                {language === 'ja' ? "名前（日本語）" : "Name (Japanese)"}
              </label>
              <input
                type="text"
                value={formData.name.ja}
                onChange={(e) => handleChange('name', 'ja', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                {language === 'ja' ? "名前（英語）" : "Name (English)"}
              </label>
              <input
                type="text"
                value={formData.name.en}
                onChange={(e) => handleChange('name', 'en', e.target.value)}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            {/* 甘辛度 */}
            <div className="col-span-2">
              <label className="block text-sm mb-1">
                {language === 'ja' ? "甘辛度" : "Sweetness"}
                （-10 〜 +10）
              </label>
              <input
                type="range"
                min="-10"
                max="10"
                value={formData.sweetness}
                onChange={(e) => handleChange('sweetness', null, parseInt(e.target.value))}
                className="w-full"
              />
              <span className="text-sm text-slate-600">{formData.sweetness}</span>
            </div>

            {/* カラー */}
            <div className="col-span-2">
              <label className="block text-sm mb-1">
                {language === 'ja' ? "表示色" : "Display Color"}
              </label>
              <input
                type="color"
                value={formData.color}
                onChange={(e) => handleChange('color', null, e.target.value)}
                className="w-full p-1 border rounded"
              />
            </div>

            {/* 送信ボタン */}
            <div className="col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                {language === 'ja' ? "キャンセル" : "Cancel"}
              </Button>
              <Button type="submit">
                {language === 'ja' ? "保存" : "Save"}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
