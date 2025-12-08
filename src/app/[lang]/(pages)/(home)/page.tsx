import { Section, Heading, Box, Text } from '@radix-ui/themes';
import { useTranslations } from 'next-intl';

export default function Page() {
  const t = useTranslations('Home');
  return (
    <Section>
      <Heading as="h2">{t("ようこそ")}</Heading>
      <Box>
        <Text>{t(`こんにちは`)}</Text><br />
        <Text>{t(`ポートフォリオへようこそ`)}</Text><br/>
        <Text>{t("説明")}</Text>
      </Box>
    </Section>
  );
}